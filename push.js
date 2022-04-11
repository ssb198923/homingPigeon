process.env.NTBA_FIX_319 = 1;
require("dotenv").config();
const TelegramBot = require('node-telegram-bot-api');
const timeout = ms => new Promise(res => setTimeout(res, ms));
const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});
const botChannelId = process.env.BOT_CHANNEL_ID;

const DBCONN = require("./src/dbConn");

exports.sendMsg = (text) => {
    bot.sendMessage(botChannelId, text).then(() => { process.exit(0); });
};