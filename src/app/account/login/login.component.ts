import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService} from '../../../services/account.service';
import { AlertService } from '../../../services/alert.service';

@Component({ templateUrl: 'login.component.html',     
             styleUrls: ['./login.component.scss'], })
export class LoginComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    returnUrl!: string;
    hide=true;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private elementRef: ElementRef
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        this.accountService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                (response: Response) => {

                    // const keys = response.headers.keys();
                    // const headers = keys.map((key: any) =>
                    //     `${key}: ${response.headers.get(key)}`);

                    // console.table(headers);
                    console.log(typeof(response) );
                    //this.router.navigate([this.returnUrl]);
                    console.log('resp: ', response);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    ngAfterViewInit() {
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
        '#fafbfc';
    }
}