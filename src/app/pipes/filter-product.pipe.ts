import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProduct',
})
export class FilterProductPipe implements PipeTransform {
  transform(products: any[], searchTerm: string): any[] {
    if (!products) return [];
    if (!searchTerm) return products;
    return products.filter((product) => {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
}
