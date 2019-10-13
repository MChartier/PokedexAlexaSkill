export default interface Pokemon {
    /**
     * The name of the Pokemon species.
     */
    Name: string;

    /**
     * The number of the Pokemon species in the National Pokedex.
     */
    Number: number;

    /**
     * A collection of Pokedex descriptions for the Pokemon species.
     */
    Descriptions: string[];

    Genera: string[];
}