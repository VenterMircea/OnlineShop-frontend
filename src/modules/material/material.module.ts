import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponent } from './material.component';

const modules = [NgModule, CommonModule];

@NgModule({
  imports: [CommonModule],
  declarations: [MaterialComponent],
  exports: [...modules],
})
export class MaterialModule {}
