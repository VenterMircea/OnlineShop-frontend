import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
const modules = [CommonModule];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [...modules],
})
export class MaterialModule {}
