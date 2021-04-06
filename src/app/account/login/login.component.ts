import { CartService } from './../../../services/cart.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, first } from 'rxjs/operators';

import { AccountService } from '../../../services/account.service';
import { of } from 'rxjs';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  hide = true;
  serverMessage = '';
  errorFromServer = false;
  popup = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public accountService: AccountService,
    private elementRef: ElementRef,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,}'
          ),
        ],
      ],
    });
  }

  get formControls() {
    return this.form.controls;
  }

  onSubmit() {
    this.errorFromServer = false;
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.accountService
      .login(this.formControls.username.value, this.formControls.password.value)
      .pipe(first())
      .subscribe(
        (response: Response) => {
          this.cartService
            .getCart()
            .pipe(catchError((err) => of([])))
            .subscribe(
              (res) => this.cartService.mergeCarts(res),
              (err) => console.log('HTTP Error', err),
              () => console.log('HTTP request completed.')
            );

          this.backToPreviousPage();
        },
        (error) => {
          this.serverMessage = error.error;
          if (error.status === 401) {
            this.errorFromServer = true;
            if (
              this.serverMessage &&
              this.serverMessage.search('Username') != 0
            ) {
              this.popup = true;
              this.serverMessage = error.error;
              this.hidePopup();
            }
          }
          if (error.status === 500) {
            this.serverMessage = 'You are not registered.';
            this.errorFromServer = true;
          }
          this.submitted = false;
          this.loading = false;
        }
      );
  }

  hidePopup() {
    setTimeout(() => {
      this.popup = false;
    }, 5000);
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#fafbfc';
  }
  backToPreviousPage() {
    const { redirect } = window.history.state;
    if (redirect == '/cart') this.router.navigateByUrl('/order');
    else this.router.navigateByUrl(redirect || '/');
  }
}
