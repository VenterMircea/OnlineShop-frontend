import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '../../../services/account.service';

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
  errorFromServer = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
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
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (response: Response) => {
          this.backToPreviousPage();
        },
        (error) => {
          if (error.status === 401) this.errorFromServer = true;
          this.submitted = false;
          this.loading = false;
        }
      );
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
