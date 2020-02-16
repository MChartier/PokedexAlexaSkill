import { HandlerInput } from "ask-sdk";
import { Response, IntentRequest } from "ask-sdk-model";
import { RequestHandlerBase } from "./RequestHandlerBase";
import Pokemon from "../models/Pokemon";
import PokemonDatabase from "../database/PokemonDatabase";

export class LookupByNumberIntentHandler extends RequestHandlerBase {
    private database: PokemonDatabase;
    
    constructor() {
        super({
            IntentName: "LookupByNumberIntent",
            RequestType: "IntentRequest"
        });
        this.database = new PokemonDatabase();
    }

    async handle(handlerInput: HandlerInput): Promise<Response> {
        console.log("Handling LookupByNumberIntent.");

        const responseBuilder = handlerInput.responseBuilder;
        const intentRequest: IntentRequest = handlerInput.requestEnvelope.request as IntentRequest;
        if (!intentRequest || !intentRequest.intent || !intentRequest.intent.slots) {
            throw "Invalid IntentRequest";
        }

        const pokemonNumber: string | undefined = intentRequest.intent.slots["Number"].value;
        if (!pokemonNumber) {
            return responseBuilder
                .speak("Couldn't find that one!")
                .withShouldEndSession(true)
                .getResponse();
        }

        // Retrieve the Pokemon with the given name
        const pokemon: Pokemon = await this.database.GetPokemonByNumber(parseInt(pokemonNumber));
        
        // Get a random description from the available set
        const description: string = pokemon.Descriptions[Math.floor(Math.random() * pokemon.Descriptions.length)];

        // E.g. "Tiny Turtle Pokemon"
        const genus: string = pokemon.Genus;

        return responseBuilder
            .speak(`${pokemon.Name}: the ${genus}. ${description}`)
            .withShouldEndSession(true)
            .getResponse();
    }
}
