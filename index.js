/**
  * Sample inbound integration showing how to use Twilio Flex
  * with Symbl's websocket API as the inbound audio stream
  */

/* import necessary modules for the web-socket API */

const env = require('dotenv').config()
const WebSocket = require("ws");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const ws = new WebSocket.Server({ server });
const WebSocketClient = require("websocket").client; 
const wsc = new WebSocketClient();
const request = require('request');

/* Initalize connection handlers */

let connection = undefined;
let client_connection = undefined;

/* Handle Connection Error */
ws.on('connectFailed', (e) => {
  console.error('Connection Failed.', e);
});

/* Handle Web Socket Connection */
ws.on('connection', (conn) => {

  connection = conn;

  connection.on('error', (err) => {
    console.log('WebSocket error.', err)
  });

  connection.on('message', (data) => {  
    const msg = JSON.parse(data);

    switch (msg.event) {

      case 'connected':
        console.log(`A new call has connected.`);
        break;

      case "start":
        console.log(`Starting Media Stream ${msg.streamSid}`);
        break;

      case "media":
        /* Send audio to Websocket Client to process */
        if(client_connection) {
          let buff = new Buffer(msg.media.payload, 'base64'); // Convert audio to base64
          client_connection.send(buff);
        };
        break;

      case "stop":
        /* Send stop request */
        client_connection.sendUTF(JSON.stringify({
          "type": "stop_request"
        }));
        client_connection.close();
        console.log(`Call Has Ended`);
        break;
    }
  });

  /* Content Payload */

  client_connection.send(JSON.stringify({
    "type": "start_request",
    "insightTypes": ["question", "action_item"],
    "config": {
      "confidenceThreshold": 0.5,
      "timezoneOffset": 480, // Your timezone offset from UTC in minutes
      "languageCode": "en-US",
      "speechRecognition": {
        "encoding": "MULAW", // Codec required for Twilio Flex
        "sampleRateHertz": 8000 // Make sure the correct sample rate is
      },
      "meetingTitle": "Customer Call"
    },
    "speaker": {
      "userId": "jon@symbl.ai",
      "name": "Jon"
    },
  }));
});

/* Generate Auth Token */

const authOptions = {
  method: 'post',
  url: 'https://api.symbl.ai/oauth2/token:generate',
  body: {
    type: "application",
    appId: process.env.APP_ID,
    appSecret: process.env.APP_SECRET
  },
  json: true
};

let auth = new Promise(resolve => {
  request(authOptions, (err, res, body) => {
    if (err) {
      console.error('error posting json: ', err);
      throw err;
    }
    resolve(body);
  })
});

/* Connect to Symbl's Websocket API */

auth.then(body => {
  wsc.connect(
    'wss://api.symbl.ai/v1/realtime/insights/1',
    null,
    null,
    { 'X-API-KEY': JSON.stringify(body.accessToken)}
  );
});

/* Websocket Client Connection */

wsc.on("connect", (conn) => {

  client_connection = conn;

  client_connection.on('close', () => {
    console.log('WebSocket closed.')
  });

  client_connection.on('error', (err) => {
    console.log('WebSocket error.', err)
  });

  client_connection.on('message', (data) => {
    if(data.type === 'utf8'){
      const { utf8Data } = data;
      console.log("data: ", utf8Data);
    }
  });
});

console.log("Listening at Port 3000");
server.listen(3000);
