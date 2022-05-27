import { Type } from "./Type";

export interface Pokemon {
  image: string;
  code: number;
  name: string;
  types: Type[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  },
  fav: boolean;
}
