const { faker } = require('@faker-js/faker');

// Chance the bot will like received message
const LIKE_PROBABILITY = 0.3;

// Time it will take the user to like
const LIKE_TIME_MIN = 500;
const LIKE_TIME_MAX = 1200;

// Time between receiving a message and starting to type
// (simulates reading)
const REACTION_TIME_MIN = 800;
const REACTION_TIME_MAX = 1500;

// Time between liking a message and starting to type
// (only applies if the message would be liked)
const LIKE_REACTION_TIMES_BUFFER = 300;

// How fast the bot will type
const BOT_TYPING_SPEED_CHARS_PER_SECOND = 12;

/**
 * Generates a message action from contact to user
 * to simulate a real user reaction
 *
 * @return  {Object}
 */
const generateBotResponse = () => {
  const body = faker.lorem.sentence();
  const shouldLikeMessage = faker.datatype.boolean(LIKE_PROBABILITY);

  // Time it takes the bot to like the user's message
  const likeTime = faker.number.int({
    min: LIKE_TIME_MIN,
    max: LIKE_TIME_MAX,
  });

  // Time it takes the bot to start typing
  const reactionTime = faker.number.int({
    min: shouldLikeMessage
      ? likeTime + LIKE_REACTION_TIMES_BUFFER + REACTION_TIME_MIN
      : REACTION_TIME_MIN,
    max: shouldLikeMessage
      ? likeTime + LIKE_REACTION_TIMES_BUFFER + REACTION_TIME_MAX
      : REACTION_TIME_MAX,
  });

  // Time it takes the bot to finish typing the generated message
  const typingTime =
    reactionTime + (body.length / BOT_TYPING_SPEED_CHARS_PER_SECOND) * 1000;

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
