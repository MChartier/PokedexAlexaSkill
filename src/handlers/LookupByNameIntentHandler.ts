import { HandlerInput } from "ask-sdk";
import { Response, IntentRequest } from "ask-sdk-model";
import { RequestHandlerBase } from "./RequestHandlerBase";
import PokemonDatabase from "../database/PokemonDatabase";
import Pokemon from "../models/Pokemon";

export class LookupByNameIntentHandler extends RequestHandlerBase {
    private database: PokemonDatabase;
    
    constructor() {
        super({
            IntentName: "LookupByNameIntent",
            RequestType: "IntentRequest"
        });
        this.database = new PokemonDatabase();
    }

    async handle(handlerInput: HandlerInput): Promise<Response> {
        console.log("Handling LookupByNameIntent.");

        const responseBuilder = handlerInput.responseBuilder;
        const intentRequest: IntentRequest = handlerInput.requestEnvelope.request as IntentRequest;
        if (!intentRequest || !intentRequest.intent || !intentRequest.intent.slots) {
            throw "Invalid IntentRequest";
        }

        const pokemonName: string | undefined = intentRequest.intent.slots["PokemonName"].value;
        if (!pokemonName) {
            return responseBuilder
                .speak("Couldn't find that one!")
                .withShouldEndSession(true)
                .getResponse();
        }

        const pokemon: Pokemon = await this.database.GetPokemonByName(pokemonName);
        
        const description: string = pokemon.Descriptions[0];
        const genus: string = pokemon.Genus;

        const speech = `${pokemon.Name}: the ${genus}. ${description}`;
        console.log(`Speaking: ${speech}`);
        return responseBuilder
            .speak(speech)
            .withShouldEndSession(true)
            .getResponse();
    }
}
