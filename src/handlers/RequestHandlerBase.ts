import { HandlerInput, RequestHandler } from "ask-sdk";
import { Response } from "ask-sdk-model";

export interface HandlerConfig {
    RequestType: string;
    IntentName?: string | undefined;
}

export abstract class RequestHandlerBase implements RequestHandler {
    private _requestType: string;
    private _intentName: string | undefined;

    constructor(handlerConfig: HandlerConfig) {
        this._requestType = handlerConfig.RequestType;
        this._intentName = handlerConfig.IntentName;
    }

    canHandle(handlerInput: HandlerInput): boolean {
        // Can handle if request type matches and, for intent requests, the intent matches
        const request = handlerInput.requestEnvelope.request;
        return (
            request.type == this._requestType &&
            (request.type != "IntentRequest" ||
                request.intent.name == this._intentName)
        );
    }

    abstract handle(handlerInput: HandlerInput): Promise<Response>;
}
