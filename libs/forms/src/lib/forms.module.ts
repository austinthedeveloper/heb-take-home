import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FORM_COMPONENTS } from './components';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [...FORM_COMPONENTS],
  exports: [...FORM_COMPONENTS],
})
export class PizzaFormsModule {}
