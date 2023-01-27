import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [CommonModule, RouterModule, NgbDropdownModule],
  exports: [NgbDropdownModule],
})
export class UiModule {}
