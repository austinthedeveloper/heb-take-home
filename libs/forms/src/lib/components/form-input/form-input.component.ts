import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pizza-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInputComponent {}
