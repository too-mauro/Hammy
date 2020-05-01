'use strict';
require("dotenv").config();
const { Client } = require("discord.js");
const bot = new Client();
const { readdirSync } = require("fs");

const events = readdirSync(`./events/`).filter(d => d.endsWith('.js'));
for (let file of events) {
    const evt = require(`./events/${file}`);
    let eName = file.split('.')[0];
    bot.on(eName, evt.bind(null, bot));
    delete require.cache[require.resolve(`./events/${file}`)];
}

bot.login(process.env.TOKEN);
console.log("Bot user successfully logged in to Discord!");
