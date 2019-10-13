import Pokemon from "../models/Pokemon";
import Pokedex, { PokemonSpeciesResponse } from "../@types/pokedex-promise-v2/index";

export default class PokemonDatabase {

    private pokedex: Pokedex;
    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const Pokedex = require('pokedex-promise-v2');

        this.pokedex = new Pokedex({ timeout: 1000, cacheLimit: 1000});
    }

    async GetPokemonByName(pokemonName: string): Promise<Pokemon> {
        console.log(`GetPokemonByName: ${pokemonName}`);
        const response: PokemonSpeciesResponse = await this.pokedex.getPokemonSpeciesByName(pokemonName.toLowerCase());
        console.log(`Response from PokeApi: ${response}`);
        return this.convertResponseToPokemon(response);
    }

    async GetPokemonByNumber(pokemonNumber: number): Promise<Pokemon> {
        console.log(`GetPokemonByNumber: ${pokemonNumber}`);
        const response: PokemonSpeciesResponse = await this.pokedex.getPokemonSpeciesByName(pokemonNumber);
        console.log(`Response from PokeApi: ${response}`);
        return this.convertResponseToPokemon(response);
    }

    async GetRandomPokemon(): Promise<Pokemon> {
        const numPokemon = 807;
        const randomNumber = Math.floor(Math.random() * numPokemon + 1);
        return await this.GetPokemonByNumber(randomNumber);
    }

    private convertResponseToPokemon(response: PokemonSpeciesResponse): Pokemon {
        // Capitalize Pokemon name
        const name = response.name.charAt(0).toUpperCase() + response.name.slice(1);

        const pokemon: Pokemon = {
            Name: name,
            Number: response.id,
            Descriptions: response.flavor_text_entries
                .filter(x => x.language.name === "en")
                .map(x => x.flavor_text),
            Genera: response.genera
                .filter(x => x.language.name === "en")
                .map(x => x.genus)
        };
        return pokemon;
    }
}
