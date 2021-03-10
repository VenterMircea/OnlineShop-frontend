import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../../../services/account.service';

@Component({ templateUrl: 'layout.component.html', 
  styleUrls: ['./layout.component.scss'], })
export class LayoutComponent implements AfterViewInit {
    constructor(
        private router: Router,
        private accountService: AccountService,
        private elementRef: ElementRef,
    ) {
        if (this.accountService.userValue) {
           // this.router.navigate(['/']);
        }
    }
    ngAfterViewInit() {
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
        '#fafbfc';
    }
}