# Twilio Flex Inbound Adapter


[![Websocket](https://img.shields.io/badge/symbl-websocket-brightgreen)](https://docs.symbl.ai/docs/streamingapi/overview/introduction)

Symbl's APIs empower developers to enable: 
- **Real-time** analysis of free-flowing discussions to automatically surface highly relevant summary discussion topics, contextual insights, suggestive action items, follow-ups, decisions, and questions.
- **Voice APIs** that makes it easy to add AI-powered conversational intelligence to either [telephony][telephony] or [WebSocket][websocket] interfaces.
- **Conversation APIs** that provide a REST interface for managing and processing your conversation data.
- **Summary UI** with a fully customizable and editable reference experience that indexes a searchable transcript and shows generated actionable insights, topics, timecodes, and speaker information.

<hr />

## Enable Symbl for Twilio Flex Calls

<hr />

 * [Setup](#setup)
 * [Integration](#integration)
 * [Conclusion](#conclusion)
 * [Community](#community)

## Introduction

This is a sample implementation of Symbl's Websocket API using Twilio Flex as an inbound adapter for streaming audio.  These instructions use Twilio Media Streams configured in the Twilio Studio and ngrok to expose a local endpoint.  

## Setup

The first step to getting setup is to [sign up][signup]. 

Update the .env file with the following:
1. Your App Id that you can get from [Platform](https://platform.symbl.ai)
2. Your App Secret that you can get from [Platform](https://platform.symbl.ai)
3. Your email address where the conversation summary and insights will be sent.
4. Your name to be attached to conversation summary 

In a new terminal, run `ngrok http 3000` to create a http tunnel to allow Twilio to hit the websocket server. If you plan to deploy this server, then you don't need to use ngrok and instead just have to configure Twilio Media Streams endpoint to hit the deployed server.

Configure your Twilio Flex flow using `Media Streams` - Follow the "Setting Up your Twilio Studio" with your ngrok or server endpoint from this [blog post](https://symbl.ai/integrating-symbl-insights-with-twilio-media-streams/)

Run the follwing npm commands:
1. `npm install` to download all the node modules
2. `node index.js` to start the websocket server

## Integration

### Pre-requisites

* JS ES6+
* Node.js
* npm (or your favorite package manager)
* ngrok - free accounts at https://ngrok.com/ (or a deployed server)
* Twilio account w/ Flex and Studio features included - https://www.twilio.com/try-twilio

### Function Parameters 

Function params passed to the Symbl [Streaming API](https://docs.symbl.ai/docs/streamingapi/overview/introduction) to open the websocket connection can be found beginning on line 71 of the index.js file.  

```javascript
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
      "userId": process.env.USER_EMAIL,
      "name": process.env.USER_NAME
    },
}));
```

### Dependencies

```json
  "dependencies": {
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "http": "0.0.0",
    "mic": "^2.1.2",
    "path": "^0.12.7",
    "request": "^2.88.2",
    "websocket": "^1.0.31",
    "ws": "^7.2.1"
  }
```

### References
Configured Twilio Studio flow

<img src="./Capture.PNG" height="50%" width="50%">

## Conclusion
When implemented once a Twilio Flex agents answers a new call, the call will connect with Symbl and the the conversation + insights will be generated and sent via email when the call is closed. 

## Community

If you have any questions, feel free to reach out to us at devrelations@symbl.ai or thorugh our Community Slack at https://developer.symbl.ai/community/slack [developer community][developer_community]

This guide is actively developed, and we love to hear from you! Please feel free to [create an issue][issues] or [open a pull request][pulls] with your questions, comments, suggestions and feedback.  If you liked our integration guide, please star our repo!

This library is released under the [MIT License][license]

[license]: LICENSE.txt
[telephony]: https://docs.symbl.ai/docs/telephony/overview/post-api
[websocket]: https://docs.symbl.ai/docs/streamingapi/overview/introduction
[developer_community]: https://community.symbl.ai/?_ga=2.134156042.526040298.1609788827-1505817196.1609788827
[signup]: https://platform.symbl.ai/?_ga=2.63499307.526040298.1609788827-1505817196.1609788827
[issues]: https://github.com/symblai/symbl-for-zoom/issues
[pulls]: https://github.com/symblai/symbl-for-zoom/pulls

