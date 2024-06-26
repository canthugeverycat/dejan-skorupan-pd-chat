const WebSocket = require('ws');

/**
 * An initlization function for the websocket to listen to updates
 *
 * @param   {ExpressServer}  server  An express server instance
 *
 * @return  {WebSocketServer} A WebSocket server instance
 */
const initializeWS = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.subscribers = new Set();

  wss.on('connection', (ws) => {
    console.log('WebSocket: Client connected');
    wss.subscribers.add(ws);

    ws.on('close', () => {
      console.log('WebSocket: Client disconnected');
      wss.subscribers.delete(ws);
    });
  });

  return wss;
};

module.exports = initializeWS;
