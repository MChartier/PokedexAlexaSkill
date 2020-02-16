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

        const slot = intentRequest.intent.slots["PokemonName"];
        let pokemonName: string | undefined = slot.value;
        if (slot && slot.resolutions && slot.resolutions.resolutionsPerAuthority && slot.resolutions.resolutionsPerAuthority[0] && slot.resolutions.resolutionsPerAuthority[0].values) {
            // Use resolved value if one is available
            pokemonName = slot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        }

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
