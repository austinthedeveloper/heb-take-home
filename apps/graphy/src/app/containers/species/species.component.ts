import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Species } from '@pizza/interfaces';
import { CharactersService } from '@pizza/services';

@Component({
  selector: 'pizza-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeciesComponent implements OnInit {
  species!: Species;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharactersService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params) => {
      this.species = await this.characterService.findSpecies(params['name']);
    });
  }
}
