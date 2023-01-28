import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';
import { filter, map, tap } from 'rxjs';

@Component({
  selector: 'pizza-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => this.route?.firstChild?.snapshot.data['pageTitle'])
  );
  constructor(private route: ActivatedRoute, private router: Router) {}
}
