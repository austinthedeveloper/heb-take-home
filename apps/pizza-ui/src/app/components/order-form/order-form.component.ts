import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import {
  PIZZA_CRUST,
  PIZZA_FLAVORS,
  PIZZA_SIZES,
  PIZZA_TABLES,
} from '@pizza/data';
import { PizzaOrder } from '@pizza/interfaces';

@Component({
  selector: 'pizza-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormComponent implements OnInit, OnChanges {
  @Input() order!: PizzaOrder;
  @Output() formReady: EventEmitter<FormGroup> = new EventEmitter();

  tables = PIZZA_TABLES;
  sizes = PIZZA_SIZES;
  crusts = PIZZA_CRUST;
  flavors = PIZZA_FLAVORS;

  form = this.fb.group({
    Crust: this.fb.control('', Validators.required),
    Flavor: this.fb.control('', Validators.required),
    Size: this.fb.control('', Validators.required),
    Table_No: this.fb.control<number>(1, Validators.required),
  });

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.formReady.emit(this.form);
  }

  ngOnChanges({ order }: SimpleChanges): void {
    if (order) {
      this.form.patchValue(this.order);
    }
  }
}
