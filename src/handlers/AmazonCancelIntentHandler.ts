import { HandlerInput } from "ask-sdk";
import { Response } from "ask-sdk-model";
import { RequestHandlerBase } from "./RequestHandlerBase";

export class AmazonCancelIntentHandler extends RequestHandlerBase {
    constructor() {
        super({
            IntentName: 'AMAZON.CancelIntent',
            RequestType: 'IntentRequest'
        });
    }

    handle(handlerInput: HandlerInput): Response {
        console.log("Handling AMAZON.CancelIntent.");

        const responseBuilder = handlerInput.responseBuilder;
        return responseBuilder
            .speak('Canceling.')
            .withShouldEndSession(true)
            .getResponse();
    }   
}