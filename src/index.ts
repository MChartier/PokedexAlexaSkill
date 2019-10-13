import { SkillBuilders } from "ask-sdk";
import { LambdaHandler } from "ask-sdk-core/dist/skill/factory/BaseSkillFactory";

import { LaunchRequestHandler } from "./handlers/LaunchRequestHandler";
import { AmazonCancelIntentHandler } from "./handlers/AmazonCancelIntentHandler";
import { AmazonStopIntentHandler } from "./handlers/AmazonStopIntentHandler";
import { SessionEndedHandler } from "./handlers/SessionEndedHandler";
import { CustomErrorHandler } from "./handlers/CustomErrorHandler";
import { AmazonHelpIntentHandler } from "./handlers/AmazonHelpIntentHandler";
import { LookupByNameIntentHandler } from "./handlers/LookupByNameIntentHandler";
import { LookupByNumberIntentHandler } from "./handlers/LookupByNumberIntentHandler";

function buildLambdaSkill(): LambdaHandler {
    const skillBuilder = SkillBuilders.standard();
    return skillBuilder
        .addRequestHandlers(
            new AmazonCancelIntentHandler(),
            new AmazonHelpIntentHandler(),
            new AmazonStopIntentHandler(),
            new LaunchRequestHandler(),
            new LookupByNameIntentHandler(),
            new LookupByNumberIntentHandler(),
            new SessionEndedHandler()
        )
        .addErrorHandlers(new CustomErrorHandler())
        .lambda();
}

// Lambda handler - entry point for skill
export const handler = buildLambdaSkill();