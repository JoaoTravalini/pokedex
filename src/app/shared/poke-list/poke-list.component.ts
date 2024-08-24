import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../service/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  private setAllPokemons: any;
  public getAllPokemons: any;

  public apiError: boolean = false;

  public pokemonTypes: string[] = ['Grama', 'Fogo', 'Água', 'Elétrico', 'Pedra', 'Terra', 'Psíquico', 'Fantasma', 'Dragão'];
  public typeMap: { [key: string]: string } = {
    'Grama': 'grass',
    'Fogo': 'fire',
    'Água': 'water',
    'Elétrico': 'electric',
    'Pedra': 'rock',
    'Terra': 'ground',
    'Psíquico': 'psychic',
    'Fantasma': 'ghost',
    'Dragão': 'dragon'
  };
  public selectedType: string = 'all';

  constructor(
    private pokeApiService: PokeApiService
  ) { }

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons.subscribe(
      res => {
        this.setAllPokemons = res.results;
        this.getAllPokemons = this.setAllPokemons;
      },
      error => {
        this.apiError = true;
      }
    );
  }

  public getSearch(value: string) {
    let filteredPokemons = this.setAllPokemons.filter((pokemon: any) => 
      !pokemon.name.indexOf(value.toLowerCase())
    );
    
    if (this.selectedType !== 'all') {
      filteredPokemons = filteredPokemons.filter((pokemon: any) => 
        pokemon.status.types.some((type: any) => type.type.name === this.selectedType.toLowerCase())
      );
    }
    
    this.getAllPokemons = filteredPokemons;
  }
  

  public filterByType() {
    const apiType = this.typeMap[this.selectedType] || 'all';
    if (apiType === 'all') {
      this.getAllPokemons = this.setAllPokemons;
    } else {
      this.getAllPokemons = this.setAllPokemons.filter((pokemon: any) => 
        pokemon.status.types.some((type: any) => type.type.name === apiType)
      );
    }
  }
}