import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('shoud search with bicicleta', () => {
    spyOn(service, 'changeTerm').and.callThrough();
    service.changeTerm('bicicleta');
    expect(service.changeTerm).toHaveBeenCalled();
    expect(service.changeTerm).toHaveBeenCalledWith('bicicleta');
  });
});
