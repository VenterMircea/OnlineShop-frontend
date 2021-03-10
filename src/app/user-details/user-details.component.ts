import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user: any;
  newUser: any;
  userLogo: any;
  constructor() {}
  accountName = true;
  accountPassword = true;
  detailsOption = 1;

  enableNameForm() {
    this.accountName = false;
  }

  ngOnInit() {
    this.newUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.userLogo =
      this.newUser.firstName.charAt(0).toUpperCase() +
      this.newUser.lastName.charAt(0).toUpperCase();
    console.log(this.user);
    this.user = { ...this.newUser, password: '' };
    console.log(this.newUser);
  }
}
