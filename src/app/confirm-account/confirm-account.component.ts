import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss'],
})
export class ConfirmAccountComponent implements OnInit {
  id = '';
  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {
    this.activatedRoute.queryParams.subscribe(
      (params) => (this.id = params['userId'])
    );
  }

  ngOnInit(): void {
    this.accountService.confirmAccount(this.id).subscribe();
    this.route.navigate(['/account/login']);
  }
}
