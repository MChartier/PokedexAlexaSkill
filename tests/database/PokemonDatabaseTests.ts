import PokemonDatabase from "../../src/database/PokemonDatabase";
import Pokemon from "../../src/models/Pokemon";

const pokemonDatabase: PokemonDatabase = new PokemonDatabase();

test('getPokemonByName', async () => {
    const pokemon: Pokemon = await pokemonDatabase.GetPokemonByName("bulbasaur");
    expect(pokemon.Name).toBe("Bulbasaur");
    expect(pokemon.Number).toBe(1);
    expect(pokemon.Descriptions).toBeTruthy();
    expect(pokemon.Genus).toBeTruthy();
});

test('getPokemonByNumber', async () => {
    const pokemon: Pokemon = await pokemonDatabase.GetPokemonByNumber(1);
    expect(pokemon.Name).toBe("Bulbasaur");
    expect(pokemon.Number).toBe(1);
    expect(pokemon.Descriptions).toBeTruthy();
    expect(pokemon.Genus).toBeTruthy();
});