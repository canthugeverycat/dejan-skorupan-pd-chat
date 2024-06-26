/**
 * An Express server for the chat API
 */

const express = require('express');
const http = require('http');
const cors = require('cors');
const initializeWS = require('./ws');

const profilesRouter = require('./api');

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT'],
  })
);

app.use('/api', profilesRouter);

const wss = initializeWS(server);
app.set('wss', wss);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
