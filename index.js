/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest');
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Haiku Reader';
const GET_FACT_MESSAGE = 'I have a haiku for you: ';
const HELP_MESSAGE = 'You can say tell me a haiku...  or, you can say stop... What can I help you with?';
const HELP_REPROMPT = 'You can ask me to tell a haiku or exit to stop. What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
  `The sun sets slowly.
  Colors paint the quiet sky.
  Night whispers softly.`,

  `Rain drips from the leaves.
  Puddles mirror cloudy skies.
  Earth drinks silently.`,

  `A lone bird sings high.
  Echoes across empty fields.
  Nature's melody.`,

  `Winter's breath is cold.
  Frosted windows hide the world.
  Fire warms the soul.`,

  `Morning dew glistens.
  Spider webs catch the sunlight.
  A new day begins.`,

  `Waves crash on the shore.
  Sands shift under wandering feet.
  Time erodes all things.`,

  `Autumn leaves descend.
  Dancing in the crisp cool air.
  Paths of red and gold.`,

  `Silent forest sleeps.
  Moonlight filters through the trees.
  Owls hoot softly now.`,

  `First snow gently falls.
  Blanketing the world in white.
  Silence fills the air.`,

  `Cherry blossoms bloom.
  Petals drift on gentle breeze.
  Spring returns anew.`
];


const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();