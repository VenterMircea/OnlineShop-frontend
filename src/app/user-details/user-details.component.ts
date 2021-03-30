import { User } from 'src/app/models/user';
import { AccountService } from './../../services/account.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user!: User;
  newUser = JSON.parse('{ }');
  userLogo: any;
  constructor(private accountService: AccountService) { }
  accountName = true;
  accountPassword = true;
  accountAddress = true;
  regExpStr = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?.&])[A-Za-z\d$@$!%*?&].{7,}';
  detailsOption = 1;
  newPassword = '';
  repeatPassword = '';
  hide = true;
  eyeIcon = false;
  validPassword = true;
  passwordMatch = true;
  confirm = false;
  interval: any;

  enableNameForm() {
    this.accountName = !this.accountName;
  }
  enablePasswordForm() {
    this.accountPassword = !this.accountPassword;
    this.eyeIcon = !this.eyeIcon;
  }
  enableAddressForm() {
    this.accountAddress = !this.accountAddress;
  }
  submitName() {
    if (this.user.password == '') {
      this.user.password = this.newUser.password;
    }
    this.accountService.userUpdate(this.user.id, this.user).subscribe();
    this.confirm = true;
    this.interval = setInterval(() => {
      this.confirm = false;
    }, 1500);
  }
  submitPassword() {
    if (this.newPassword == this.repeatPassword && this.newPassword != '') {
      if (new RegExp(this.regExpStr, 'g').test(this.newPassword)) {
        this.user.password = this.newPassword;
        this.accountService.userUpdate(this.user.id, this.user).subscribe();
        this.confirm = true;
        this.interval = setInterval(() => {
          this.validPassword = true;
          this.confirm = false;
        }, 3500);
      }
      this.validPassword = false
    } else {
      this.passwordMatch = false;
    }
  }
  submitAddress() {
    if (this.user.password == '') {
      this.user.password = this.newUser.password;
    }
    this.accountService.userUpdate(this.user.id, this.user).subscribe();
    this.confirm = true;
    this.interval = setInterval(() => {
      this.confirm = false;
    }, 1500);
  }

  ngOnInit() {
    this.newUser = JSON.parse(localStorage.getItem('user') || '{ }');
    if (this.newUser.hasOwnProperty('firstName'))
      this.userLogo =
        this.newUser.firstName[0].toUpperCase() +
        this.newUser.lastName[0].toUpperCase();
    this.user = { ...this.newUser, password: '' };
    delete this.user.token;
  }
  ngOnDestroy() {
    if ((this, this.interval)) {
      clearInterval(this.interval);
    }
  }
}
