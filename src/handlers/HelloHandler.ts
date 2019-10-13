import { HandlerInput } from "ask-sdk";
import { Response } from "ask-sdk-model";
import { RequestHandlerBase } from "./RequestHandlerBase";

export class HelloHandler extends RequestHandlerBase {
    constructor() {
        super({
            IntentName: 'hello',
            RequestType: 'IntentRequest'
        });
    }

    handle(handlerInput: HandlerInput): Response { //  Response | Promise<Response>
        console.log('hello request init');
        const responseBuilder = handlerInput.responseBuilder;

        return responseBuilder
            .speak('hello to you too')
            .reprompt('what was that?')
            .getResponse();
    }   
}