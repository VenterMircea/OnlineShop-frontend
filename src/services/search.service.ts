import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchSource = new BehaviorSubject('');
  currentSearch = this.searchSource.asObservable();
  constructor() {}
  searchValue(val: string) {
    this.searchSource.next(val);
  }
}
