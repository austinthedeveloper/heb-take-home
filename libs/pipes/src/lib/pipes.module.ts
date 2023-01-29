import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PIPES_LIB } from './pipes';

@NgModule({
  imports: [CommonModule],
  declarations: [...PIPES_LIB],
  exports: [...PIPES_LIB],
})
export class PipesModule {}
