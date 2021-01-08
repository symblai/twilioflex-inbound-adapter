# Twilio Flex Inbound Adapter

============================

<hr />
    <img src="https://developer.symbl.ai/assets/images/Symbl.svg" height="48px" alt="Symbl is Conversational AI />
<hr /> 

============================

Symbl's APIs empower developers to enable: 
- **Real-time** analysis of free-flowing discussions to automatically surface highly relevant summary discussion topics, contextual insights, suggestive action items, follow-ups, decisions, and questions.\
- **Voice APIs** that makes it easy to add AI-powered conversational intelligence to either [telephony][telephony] or [WebSocket][websocket] interfaces.
- **Conversation APIs** that provide a REST interface for managing and processing your conversation data.
- **Summary UI** with a fully customizable and editable reference experience that indexes a searchable transcript and shows generated actionable insights, topics, timecodes, and speaker information.
<hr />
Enable Symbl for Twilio Flex Calls
<hr />
 * [Introduction](#introduction)
 * [Pre-requisites](#pre-requisites)
 * [Setup](#setup)
 * [References](#references)
 * [Conclusion](#conclusion)
 * [Community](#community)

## Introduction

This is a sample implementation of Symbl's Websocket API using Twilio Flex as an inbound adapter for streaming audio.  These instructions use Twilio Media Streams configured in the Twilio Studio and ngrok to expose a local endpoint.  

## Pre-requisites

* JS ES6+
* Node.js
* npm (or your favorite package manager)
* ngrok - free accounts at https://ngrok.com/ (or a deployed server)
* Twilio account w/ Flex and Studio features included - https://www.twilio.com/try-twilio

## Setup 
The first step to getting setup is to [sign up][signup]. 

Update the .env file with the following:
1. Your App Id that you can get from [Platform](https://platform.symbl.ai)
2. Your App Secret that you can get from [Platform](https://platform.symbl.ai)

In a new terminal, run `ngrok http 3000` to create a http tunnel to allow Twilio to hit the websocket server. If you plan to deploy this server, then you don't need to use ngrok and instead just have to configure Twilio Media Streams endpoint to hit the deployed server.

Configure your Twilio Flex flow using `Media Streams` - Follow the "Setting Up your Twilio Studio" with your ngrok or server endpoint from this [blog post](https://symbl.ai/integrating-symbl-insights-with-twilio-media-streams/)

Run the follwing npm commands:
1. `npm install` to download all the node modules
2. `node index.js` to start the websocket server

## References
Configured Twilio Studio flow

![pic](/Capture.PNG)

## Conclusion

## Community

If you liked our integration guide, please star our repo! If you have any questions, feel free to reach out to us at devrelations@symbl.ai or through our Community Slack at https://developer.symbl.ai/community/slack or our [developer community][developer_community]. 
This library is released under the [MIT License][license]
[license]: LICENSE.txt
[websocket]: https://docs.symbl.ai/docs/streamingapi/overview/introduction
[developer_community]: https://community.symbl.ai/?_ga=2.134156042.526040298.1609788827-1505817196.1609788827
[signup]: https://platform.symbl.ai/?_ga=2.63499307.526040298.1609788827-1505817196.1609788827

