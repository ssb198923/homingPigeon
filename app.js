process.env.NTBA_FIX_319 = 1;
require("dotenv").config();
const TelegramBot = require('node-telegram-bot-api');
const timeout = ms => new Promise(res => setTimeout(res, ms));
const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

const channelId="-1001536101901";

const DBCONN = require("./src/dbConn");

bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});

bot.onText(/\/find (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    let dataMsg = [];

    console.log("chatId",chatId);

    DBCONN.selectDb({keyword : resp})
    .then( function(res) {
        res.forEach( (item, idx) => {
            dataMsg[idx] = `<a href="${item.url}">${item.title}</a>`;
        });

        bot.sendMessage(chatId, dataMsg.join("\n"), { parse_mode :"html" });
    });
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    // send a message to the chat acknowledging receipt of their message
    // bot.sendMessage(chatId, 'Received your message');
    console.log(chatId);
});

bot.on
