const WebSocket = require('ws');

const {
  messages: { create: dbCreate },
} = require('../../db/index');
const generateBotResponse = require('../../utils/generateBotResponse');

/**
 * Helper method to send a message to the current subscribers
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
  const { chatId } = message;

  const { reactionTime, typingTime, data } = generateBotResponse();

  try {
    // Simulate typing indicator
    setTimeout(() => {
      wsSend(wss, JSON.stringify({ type: 'typing', status: true, chatId }));
    }, reactionTime);

    // Simulate typing time
    setTimeout(async () => {
      wsSend(wss, JSON.stringify({ type: 'typing', status: false, chatId }));

      // Create a response message in the database
      const response = await dbCreate({
        chatId,
        ...data,
      });

      // Notify the user
      wsSend(wss, JSON.stringify({ type: 'message', ...response }));
    }, typingTime);
  } catch (error) {
    console.error('WebSocket Error:', error);
    wsSend(
      wss,
      JSON.stringify({
        type: 'error',
        message: 'Failed to process the message.',
      })
    );
  }
};

module.exports = botReaction;
