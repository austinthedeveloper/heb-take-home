import { Component, OnInit } from '@angular/core';
import { Character } from '@pizza/interfaces';
import { CharactersService } from '@pizza/services';

@Component({
  selector: 'pizza-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  offset: number = 0;
  count: number = 0;
  characters: Character[] = [];

  constructor(private charactersService: CharactersService) {}

  async ngOnInit(): Promise<void> {
    await this.updateCharacters();
  }

  async updateCharacters() {
    const result = await this.charactersService.getCharacters(this.offset);
    this.count = result.count;
    this.characters = result.characters;
  }

  showPrevious() {
    return this.offset > 0;
  }

  showNext() {
    return this.offset + 10 < this.count;
  }

  async onPrevious() {
    this.offset -= 10;
    await this.updateCharacters();
  }

  async onNext() {
    this.offset += 10;
    await this.updateCharacters();
  }
}
