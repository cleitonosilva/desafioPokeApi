import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private httpClient: HttpClient) { }

  getPokemons(limit: number, offset: number){
    const url = `${this.apiUrl}?limit=${limit}&offset=${offset}`

    return this.httpClient.get<any>(url).pipe(
      map(value => value.results),
      map((value: any) => {
        return from(value).pipe(
          mergeMap((v: any) => this.httpClient.get(v.url)),
        );
      }),
      mergeMap(value => value)
    )
  }

  getPokemon(nomePokemon: string){
    const url = `${this.apiUrl}${nomePokemon}`

    return this.httpClient.get<any>(url);
  }

  setFavorito(id: number){
    const favoritos = this.favoritos;

    if(favoritos.indexOf(id) == -1){
      favoritos.push(id);
    }else {
      favoritos.splice(favoritos.indexOf(id), 1);
    }

    localStorage.setItem('poke-favs', JSON.stringify(favoritos))
  }

  get favoritos(){
    const favoritos = JSON.parse(localStorage.getItem('poke-favs')!) || [];

    return favoritos;
  }
}
