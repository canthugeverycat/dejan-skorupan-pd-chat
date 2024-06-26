const { faker } = require('@faker-js/faker');

const LIKE_TIME_MIN = 500;
const LIKE_TIME_MAX = 1200;
const REACTION_TIME_MIN = 800;
const REACTION_TIME_MAX = 1500;
const BOT_TYPING_SPEED_CHARS_PER_SECOND = 7;

/**
 * Generates a message action from contact to user
 * to simulate a real user reaction
 *
 * @return  {Object}
 */
const generateBotResponse = () => {
  const body = faker.lorem.sentence();
  const shouldLikeMessage = faker.datatype.boolean();

  // Time it takes the bot to like the user's message
  const likeTime = faker.number.int({
    min: LIKE_TIME_MIN,
    max: LIKE_TIME_MAX,
  });

  // Time it takes the bot to start typing
  const reactionTime = faker.number.int({
    min: shouldLikeMessage ? likeTime + REACTION_TIME_MIN : REACTION_TIME_MIN,
    max: shouldLikeMessage ? likeTime + REACTION_TIME_MAX : REACTION_TIME_MAX,
  });

  // Time it takes the bot to finish typing
  const typingTime = faker.number.int({
    min: reactionTime,
    max: reactionTime + BOT_TYPING_SPEED_CHARS_PER_SECOND * 1000,
  });

  return {
    shouldLikeMessage,
    likeTime,
    reactionTime,
    typingTime,
    data: {
      body,
      sender: 0,
    },
  };
};

module.exports = generateBotResponse;
