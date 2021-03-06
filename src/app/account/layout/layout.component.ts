import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '../../../services/account.service';

@Component({
  templateUrl: 'layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements AfterViewInit {
  userLanguage='';
  constructor(
    private router: Router,
    private accountService: AccountService,
    private elementRef: ElementRef,
    public translate: TranslateService
  ) {
    translate.addLangs(['ro', 'en', 'de']);
    if(!localStorage.hasOwnProperty('lang'))
      localStorage.setItem('lang', JSON.stringify('en'));
    this.userLanguage=JSON.parse(localStorage.getItem('lang') || 'null');
    let browserLang:string;
    if(this.userLanguage!='') browserLang=this.userLanguage;
    else browserLang = translate.getBrowserLang();
    translate.setDefaultLang(browserLang);
    translate.use(browserLang.match(/ro|en|de/) ? browserLang : 'ro');
  }
  setLanguage(lang: string) {
    localStorage.setItem('lang', JSON.stringify(lang));
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#fafbfc';
  }
}
