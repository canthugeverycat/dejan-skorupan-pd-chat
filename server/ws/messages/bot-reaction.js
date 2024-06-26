const WebSocket = require('ws');

const {
  messages: { create: dbCreate, update: dbUpdate },
} = require('../../db/index');
const generateBotResponse = require('../../utils/generateBotResponse');

/**
 * Helper method to send a message to current subscribers
 * @param   {WebSocketServer}  wss   Instance of WebSocketServer
 * @param   {any}              data  Data to be send
 */
const wsSend = (wss, data) => {
  if (wss.subscribers.size) {
    // Notify all subscribers of the update
    wss.subscribers.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) client.send(data);
    });
  }
};

/**
 * A WebSocket function to simulate a reaction from the contact to the user
 *
 * The bot itself can simulate typing, liking and message replying
 *
 * @param   {WebSocketServer}  wss  Instance of WebSocketServer
 * @param   {MessageType}  message  Last message from the user
 */
const botReaction = (wss, message) => {
  const { id, chatId } = message;

  const { shouldLikeMessage, likeTime, reactionTime, typingTime, data } =
    generateBotResponse();

  try {
    // Simulate liking the user's message
    if (shouldLikeMessage) {
      setTimeout(async () => {
        await dbUpdate({
          id,
          liked: true,
        });

        wsSend(
          wss,
          JSON.stringify({ action: 'like', payload: { id, chatId } })
        );
      }, likeTime);
    }

    // Simulate typing indicator
    setTimeout(() => {
      wsSend(
        wss,
        JSON.stringify({ action: 'typing', payload: { value: true, chatId } })
      );
    }, reactionTime);

    // Simulate typing time
    setTimeout(async () => {
      wsSend(
        wss,
        JSON.stringify({ action: 'typing', payload: { value: false, chatId } })
      );

      // Create a response message in the database
      const response = await dbCreate({
        chatId,
        ...data,
      });

      // Notify the user
      wsSend(wss, JSON.stringify({ action: 'message', payload: response }));
    }, typingTime);
  } catch (error) {
    console.error('WebSocket Error:', error);
    wsSend(
      wss,
      JSON.stringify({
        action: 'error',
        data: {
          error: 'Failed to process the message.',
        },
      })
    );
  }
};

module.exports = botReaction;
