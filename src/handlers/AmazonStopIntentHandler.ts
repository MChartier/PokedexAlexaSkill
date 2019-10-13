import { HandlerInput } from "ask-sdk";
import { Response } from "ask-sdk-model";
import { RequestHandlerBase } from "./RequestHandlerBase";

export class AmazonStopIntentHandler extends RequestHandlerBase {
    constructor() {
        super({
            IntentName: 'AMAZON.StopIntent',
            RequestType: 'IntentRequest'
        });
    }

    handle(handlerInput: HandlerInput): Response {
        console.log("Handling AMAZON.StopIntent.");

        const responseBuilder = handlerInput.responseBuilder;
        return responseBuilder
            .speak('Stopping.')
            .withShouldEndSession(true)
            .getResponse();
    }   
}