import { SkillBuilders } from 'ask-sdk';
import { LambdaHandler } from 'ask-sdk-core/dist/skill/factory/BaseSkillFactory';
 
import { LaunchRequestHandler } from './handlers/LaunchRequestHandler';
import { AmazonCancelIntentHandler } from './handlers/AmazonCancelIntentHandler';
import { AmazonStopIntentHandler } from './handlers/AmazonStopIntentHandler';
import { HelloHandler } from './handlers/HelloHandler';
import { SessionEndedHandler } from './handlers/SessionEndedHandler';
import { CustomErrorHandler } from './handlers/CustomErrorHandler';
 
function buildLambdaSkill(): LambdaHandler {
  return SkillBuilders.standard()
    .addRequestHandlers(
      new AmazonCancelIntentHandler,
      new AmazonStopIntentHandler,
      new HelloHandler(),
      new LaunchRequestHandler(),
      new SessionEndedHandler()
    )
    .addErrorHandlers(new CustomErrorHandler())
    .lambda();
}
 
// Lambda handler - entry point for skill
export let handler = buildLambdaSkill();