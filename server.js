/* This is Hammy's main server file. All other files used for
commands and events run as if they are included in this file.

This file initializes a Discord.js Client and grabs the bot token that's
stored in the .env file. It then passes the bot client to the ready event,
where it can then be usable on Discord. This initializes all the available
commands and events so they're usable later. */

'use strict';
require("dotenv").config();
const { Client, Collection } = require("discord.js");
const bot = new Client();
const { readdirSync } = require("fs");

// Load the events into memory.
const events = readdirSync("./events/").filter(e => e.endsWith('.js'));
for (let file of events) {
    const evt = require(`./events/${file}`);
    let eName = file.split('.')[0];
    bot.on(eName, evt.bind(null, bot));
    delete require.cache[require.resolve(`./events/${file}`)];
}

// Load the commands into memory.
["aliases", "commands"].forEach(x => bot[x] = new Collection());
const commands = readdirSync("./commands/").filter(c => c.endsWith('.js'));
for (let file of commands) {
    let pull = require(`./commands/${file}`);
    bot.commands.set(pull.config.name, pull);
    if (pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));
    delete require.cache[require.resolve(`./commands/${file}`)];
}

// Logs the bot into the Discord platform using the bot token in the .env file.
bot.login(process.env.TOKEN);
