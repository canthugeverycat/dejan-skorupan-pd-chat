const { faker } = require('@faker-js/faker');

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

  const reactionTime = faker.number.int({
    min: REACTION_TIME_MIN,
    max: REACTION_TIME_MAX,
  });

  const typingTime = faker.number.int({
    min: reactionTime,
    max: reactionTime + BOT_TYPING_SPEED_CHARS_PER_SECOND * 1000,
  });

  return {
    reactionTime,
    typingTime,
    data: {
      body,
      sender: 0,
    },
  };
};

module.exports = generateBotResponse;
