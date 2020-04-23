// Gets the Client from Discord.js and the bot token.
'use strict';
const { Client } = require("discord.js");
const { token } = require("./settings.json");
const bot = new Client();

var counter = 0;
let luckyNum = 51;
const purpleHeart = '💜';
const brokenHeart = "<:hamzasux:699845663713918997>";
const sayings = [
  "Good 1, hope everyone has a lovely 2!\n💜 <('u '<)",
  "L(-_- L)\n/(o - o /)\n*boi*",
  "\\ (^-w-^) /",
  "(' o')7\n(' u')/",
  "You're doing the best you can!\n<('. '<)",
  "oh dear.",
  "Good afternoon!! <('u '<)\nHope Hamza has a wonderful day!",
  "c('u 'c)"
];

// Logs the bot into the Discord platform.
bot.login(token);
console.log("Bot user successfully logged in to Discord!");

bot.on("ready", () => {
  bot.user.setStatus("online");
  console.log(`${bot.user.username} is online and ready!`);
});

bot.on("message", message => {
  if (message.author.bot || message.channel.type === "dm") return;
  else if (!message.guild.available) return;

  if (message.content.includes(purpleHeart)) {
    message.channel.send(messageGrabBag());
    counter++;
  }
  else if (message.content.includes(brokenHeart)) {
    return message.channel.send(`(>' n')> ${brokenHeart}\n(>' .')> ${brokenHeart}   <('U '<)\n(>' u')> 💜 <('U '<)`);
  }
});

function messageGrabBag() {
  let sentence = sayings[counter % sayings.length];
  if (counter % luckyNum == luckyNum - 1) return `${brokenHeart} <('_ '<)`;
  if (sentence == sayings[0]) {
    // replace the placeholder numbers to the corresponding time of day
    var date = new Date();
    var hour = date.getHours();
    if (hour >= 23 || hour < 6) {
      return "Hope everyone has a lovely night! Sweet dreams!\n💜 <('u '<)";
    }
    else if (hour >= 19) {
      return sentence.replace('1', 'evening').replace('2', 'night');
    }
    else if (hour >= 12) {
      return sentence.replace('1', 'afternoon').replace('2', 'day');
    }
    else if (hour >= 6) {
      return sentence.replace('1', 'morning').replace('2', 'day');
    }
  }
  else {
    return sentence;
  }
}
