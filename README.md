# Twilio Flex Inbound Adapter

This is a sample implementation of using Twilio Flex as an inbound adapter for streaming audio to through Symbl's Websocket API

## Update .env

First update the .env file with the following:
1. Your App Id that you can get from [Platform](https://platform.symbl.ai)
2. Your App Secret that you can get from [Platform](https://platform.symbl.ai)
3. Your Email Address
4. Your First and Last name

## Twilio Flex

1. Configure your Twilio Flex flow using `Media Streams` - Follow this [blog post](https://symbl.ai/blogs/twilio-flex-integration) for reference

## npm

1. First, run `npm install` to download all the node modules
2. Second, run `node index.js` to start the websocket server

## ngrok

Finally in a new terminal, run `./ngrok http 3000` to create a http tunnel to allow Twilio to hit the websocket server. If you plan to deploy this server, then you don't need to use ngrok and instead just have to configure Twilio Media Streams endpoint to hit the deployed server.

## References

Feel free to fork any of the projects here to use on your own and if you have any code improvements, make a pull request and the request will be reviewed by one of our admins.

For a sample reference implentation using Symbl, take a look at our [Platform](https://platform.symbl.ai).

If you have questions, bugs to report or feature suggestions, join our [Dev Community](https://community.symbl.ai/).
