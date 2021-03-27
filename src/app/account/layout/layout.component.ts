import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../../../services/account.service';

@Component({
  templateUrl: 'layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements AfterViewInit {
  constructor(
    private router: Router,
    private accountService: AccountService,
    private elementRef: ElementRef
  ) {}
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#fafbfc';
  }
}
