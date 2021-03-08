import { AccountService } from './../../../services/account.service';
import { CreateUser } from './../../models/createUser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private accountService: AccountService) {}
  option = 1;
  user = new CreateUser('', '', '', '', '', '', '', {
    address: '',
    city: '',
    county: '',
    postalCode: '',
  });

  optionIncrease() {
    this.option++;
  }
  optionDecrease() {
    this.option--;
  }
  submit() {
    this.accountService.createUser(this.user).subscribe();
  }

  ngOnInit(): void {}
}
