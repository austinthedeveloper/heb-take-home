import { Pipe, PipeTransform } from '@angular/core';
import { PizzaOrder } from '@pizza/interfaces';

@Pipe({
  name: 'currentOrders',
})
export class CurrentOrdersPipe implements PipeTransform {
  transform(values: PizzaOrder[] = [], today = false): PizzaOrder[] {
    return values.filter((value) => this.isToday(value.Timestamp) === today);
  }

  /**
   * Pulled from a tutorial
   * https://flaviocopes.com/how-to-determine-date-is-today-javascript/
   *
   * @private
   * @param {string} timestamp
   * @return {*}
   * @memberof CurrentOrdersPipe
   */
  private isToday(timestamp: string) {
    const today = new Date();
    const someDate = new Date(timestamp);
    return (
      someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  }
}
