import { HandlerInput } from "ask-sdk";
import { Response } from "ask-sdk-model";
import { RequestHandlerBase } from "./RequestHandlerBase";

export class SessionEndedHandler extends RequestHandlerBase {
    constructor() {
        super({
            RequestType: 'LaunchRequest'
        });
    }

    handle(handlerInput: HandlerInput): Response {
        const responseBuilder = handlerInput.responseBuilder;

        return responseBuilder.getResponse();
    }   
}