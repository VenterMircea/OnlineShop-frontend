import { AccountService } from './../../services/account.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user: any;
  newUser: any;
  userLogo: any;
  constructor(private accountService: AccountService) {}
  accountName = true;
  accountPassword = true;
  accountAddress = true;
  detailsOption = 1;
  newPassword = '';
  repeatPassword = '';
  passwordMatch = true;
  confirm = false;
  interval: any;

  enableNameForm() {
    this.accountName = !this.accountName;
  }
  enablePasswordForm() {
    this.accountPassword = !this.accountPassword;
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
      this.user.password = this.newPassword;
      this.accountService.userUpdate(this.user.id, this.user).subscribe();
      this.confirm = true;
      this.interval = setInterval(() => {
        this.confirm = false;
      }, 1500);
    } else {
      this.passwordMatch = false;
    }
  }
  submitAddress() {
    if (this.user.password == '') {
      this.user.password = this.newUser.password;
    }
    this.accountService.userUpdate(this.user.id, this.user).subscribe();
    console.log(this.user);
    this.confirm = true;
    this.interval = setInterval(() => {
      this.confirm = false;
    }, 1500);
  }

  ngOnInit() {
    this.newUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.userLogo =
      this.newUser.firstName.charAt(0).toUpperCase() +
      this.newUser.lastName.charAt(0).toUpperCase();
    console.log(this.user);
    this.user = { ...this.newUser, password: '' };
    delete this.user.token;
    console.log(this.newUser);
  }
  ngOnDestroy() {
    if ((this, this.interval)) {
      clearInterval(this.interval);
    }
  }
}
