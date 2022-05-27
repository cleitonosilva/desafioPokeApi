import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Pokemon } from 'src/models/Pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  displayedColumns: string[] = ['favorito', 'codigo', 'preview', 'nome', 'tipo', 'hp', 'ataque', 'defesa', 'velocidade'];
  pokemonDataSource = new MatTableDataSource<Pokemon>();
  pokemons!: Pokemon[];
  pageEvent!: PageEvent;
  filtro: string = '';
  exibirFavoritos: boolean = false;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons(10, 0);
  }

  getPokemons(limit: number, offset: number){
    this.pokemons = [];
    this.pokemonService.getPokemons(limit, offset).subscribe({
      next: (result: any) => { this.addPokemon(result) },
      complete: () => {this.pokemonDataSource = new MatTableDataSource(this.pokemons)}
    })
  }

  filtrarPokemon(){
    this.exibirFavoritos = false;

    if(this.filtro.trim().length){
      this.pokemons = [];
      this.pokemonService.getPokemon(this.filtro.trim().toLocaleLowerCase()).subscribe({
        next: (result) => { this.addPokemon(result) },
        error: () => { alert(`Não foi encontrado nenhum pokemon com o nome ${this.filtro}`)},
        complete: () => {this.pokemonDataSource = new MatTableDataSource(this.pokemons)}
      })
    }else {
      this.getPokemons(10, 0);
    }
  }

  listarFavoritos(){
    if(!this.exibirFavoritos){
      this.pokemons = [];
      this.pokemonService.getPokemons(1126, 0).subscribe({
        next: (result: any) => {
          const favoritos = this.pokemonService.favoritos;
          if(favoritos.indexOf(result.id) != -1){
            this.addPokemon(result);
          }
        },
        complete: () => {this.pokemonDataSource = new MatTableDataSource(this.pokemons)}
      })
    }else {
      this.getPokemons(10, 0);
    }
  }

  addPokemon(result: any){
    this.pokemons.push({
      image: result.sprites.front_default,
      code: result.id,
      name: result.name,
      types: result.types.map((t: { type: { name: string; }; }) => t.type.name),
      stats: {
        hp: result.stats[0].base_stat,
        attack: result.stats[1].base_stat,
        defense: result.stats[2].base_stat,
        speed: result.stats[3].base_stat
      },
      fav: this.handleFavorito(result.id)
    })
  }

  favoritar(pokemon: Pokemon, index: number){
    const fav = pokemon.fav;
    this.pokemons[index].fav = !fav;

    this.pokemonService.setFavorito(pokemon.code);
  }

  handleFavorito(id: number){
    const favoritos = this.pokemonService.favoritos;

    if(favoritos?.indexOf(id) == -1){
      return false;
    }

    return true;
  }

  handlePagination(event: any) {
    const limit = event.pageSize;
    const offset =  event.pageSize * event.pageIndex;
    this.getPokemons(limit, offset);
  }
}


