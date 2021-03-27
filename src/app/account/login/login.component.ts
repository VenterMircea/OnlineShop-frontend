import { Component, OnInit, ElementRef } from '@angular/core';
import { Router} from '@angular/router';
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
  serverMessage = "";
  errorFromServer = false;
  popup = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
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
    this.accountService.login(this.formControls.username.value, this.formControls.password.value)
      .pipe(first())
      .subscribe(
        (response: Response) => {
          console.log(response.headers);
          this.backToPreviousPage();
        },
        error => {
          this.serverMessage = error.error;
          if (error.status === 401) {
            this.errorFromServer = true;
            if (this.serverMessage && this.serverMessage.search("Username") != 0) {
              this.popup = true;
              this.serverMessage = error.error;
              this.hidePopup();
            }
          }
          if (error.status === 500) {
            this.serverMessage = "You are not register.";
            this.errorFromServer = true;
          }
          this.submitted = false;
          this.loading = false;
        });
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
