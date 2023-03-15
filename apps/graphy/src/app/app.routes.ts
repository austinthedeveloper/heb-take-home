import { SpeciesComponent } from './containers/species/species.component';
import { CharacterComponent } from './containers/character/character.component';
import { BrowseComponent } from './containers/browse/browse.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    component: BrowseComponent,
  },
  {
    path: 'character',
    component: CharacterComponent,
  },
  {
    path: 'species',
    component: SpeciesComponent,
  },
];
