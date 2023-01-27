import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KeyValue } from '@pizza/interfaces';

@Component({
  selector: 'pizza-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSelectComponent {
  @Input() control = new FormControl();
  @Input() label!: string;
  @Input() items: KeyValue[] = [];
}
