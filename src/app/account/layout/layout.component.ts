import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '../../../services/account.service';

@Component({
  templateUrl: 'layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements AfterViewInit {
  constructor(
    private router: Router,
    private accountService: AccountService,
    private elementRef: ElementRef,
    public translate: TranslateService
  ) {
    translate.addLangs(['ro', 'en', 'de']);
    const browserLang = translate.getBrowserLang();
    translate.setDefaultLang(browserLang);
    translate.use(browserLang.match(/ro|en|de/) ? browserLang : 'ro');
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#fafbfc';
  }
}
