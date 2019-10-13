import Pokemon from "../models/Pokemon";

export interface IPokemonDatabase {
    GetPokemonByName(pokemonName: string) : Pokemon;
    GetPokemonByNumber(pokemonNumber: number) : Pokemon;
    GetRandomPokemon() : Pokemon;
}

export default class PokemonDatabase implements IPokemonDatabase {
    GetPokemonByName(pokemonName: string): Pokemon {
        throw new Error("Method not implemented.");
    }

    GetPokemonByNumber(pokemonNumber: number): Pokemon {
        throw new Error("Method not implemented.");
    }

    GetRandomPokemon(): Pokemon {
        throw new Error("Method not implemented.");
    }
}