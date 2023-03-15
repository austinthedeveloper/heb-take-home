import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterDetail } from '@pizza/interfaces';
import { CharactersService } from '@pizza/services';

@Component({
  selector: 'pizza-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterComponent {
  character!: CharacterDetail;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharactersService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params) => {
      this.character = await this.characterService.findCharacter(
        params['name']
      );
    });
  }
}
