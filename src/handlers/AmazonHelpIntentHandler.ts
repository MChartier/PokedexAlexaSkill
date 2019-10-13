import { HandlerInput } from "ask-sdk";
import { Response } from "ask-sdk-model";
import { RequestHandlerBase } from "./RequestHandlerBase";

export class AmazonHelpIntentHandler extends RequestHandlerBase {
    constructor() {
        super({
            IntentName: 'AMAZON.HelpIntent',
            RequestType: 'IntentRequest'
        });
    }

    handle(handlerInput: HandlerInput): Response {
        console.log("Handling AMAZON.HelpIntent.");

        const responseBuilder = handlerInput.responseBuilder;
        return responseBuilder
            .speak('This is the part where I help you.')
            .getResponse();
    }   
}