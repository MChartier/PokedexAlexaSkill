import Pokemon from "../models/Pokemon";
import { DocumentClient, GetItemOutput } from "aws-sdk/clients/dynamodb";
import DynamoDB = require("aws-sdk/clients/dynamodb");

export default class PokemonDatabase {

    private docClient: DocumentClient;
    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const AWS = require('aws-sdk');
        AWS.config.update({
            region: 'us-east-1'
        });

        this.docClient = new AWS.DynamoDB.DocumentClient();
    }

    async GetPokemonByName(pokemonName: string): Promise<Pokemon> {
        console.log(`GetPokemonByName: ${pokemonName}`);
        return this.getPokemonByName(pokemonName);
    }

    async GetPokemonByNumber(pokemonNumber: number): Promise<Pokemon> {
        console.log(`GetPokemonByNumber: ${pokemonNumber}`);
        return this.getPokemonByNumber(pokemonNumber);
    }

    async GetRandomPokemon(): Promise<Pokemon> {
        const numPokemon = 807;
        const randomNumber = Math.floor(Math.random() * numPokemon + 1);
        return await this.GetPokemonByNumber(randomNumber);
    }

    private async getPokemonByName(pokemonName: string): Promise<Pokemon> {
        const params = {
            TableName: "PokemonNumbers",
            Key: {
                "Name": pokemonName
            }
        };

        const response: GetItemOutput = await this.docClient.get(params).promise();
        if (!response || !response.Item) {
            if (!response || !response.Item) {
                console.log("Invalid response from DynamoDB");
                throw -1;
            }
            throw -1;
        }

        const pokemonNumber = Number(response.Item['Number']);
        return this.getPokemonByNumber(pokemonNumber);
    }

    private async getPokemonByNumber(pokemonNumber: number): Promise<Pokemon> {
        const params = {
            TableName: "PokemonDescriptions",
            Key: { 
                "Id" : pokemonNumber
              }
        };

        const response: GetItemOutput = await this.docClient.get(params).promise();
        if (!response || !response.Item) {
            console.log("Invalid response from DynamoDB");
            throw -1;
        }

        return this.rowToPokemon(response.Item);
    }

    private rowToPokemon(row: DynamoDB.AttributeMap): Pokemon {
        if (!row.Name.S || !row.Genus.S || !row.Descriptions.SS) {
            console.log("Invalid response from DynamoDB: " + row);
            throw -1;
        }

        return {
            Name: row.Name.S,
            Number: Number(row.Id.N),
            Genus: row.Genus.S,
            Descriptions: Array.from(row.Descriptions.SS.values())
        };
    }
}
