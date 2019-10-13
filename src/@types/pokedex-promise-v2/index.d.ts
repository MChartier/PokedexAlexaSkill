// Type definitions of pokedex-promise-v2
// Project: PokedexAlexaSkill
// Definitions by: Matthew Chartier
// http://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-class-d-ts.html

declare class Pokedex {
    constructor();

    getPokemonSpeciesByName(name: number | string): Pokedex.PokemonSpeciesResponse;
}

declare namespace Pokedex {
    export interface PokemonSpeciesResponse {
        name: string;
        id: number;
        flavor_text_entries: FlavorTextEntry[];
        genera: GenusEntry[];
    }

    export interface FlavorTextEntry {
        flavor_text: string;
        language: Language;
    }

    export interface Language {
        name: string;
        url: string;
    }

    export interface GenusEntry {
        genus: string;
        language: Language;
    }
}

export = Pokedex;