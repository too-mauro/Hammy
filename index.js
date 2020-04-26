// Gets the Client from Discord.js and the bot token.
'use strict';
const { Client } = require("discord.js");
const { token, ownerID, loggingChannel } = require("./settings.json");
const bot = new Client();

const purpleHeart = '💜';
const brokenHeart = "<:hamzasux:699845663713918997>";
const sayings = [
  "Good <greeting>, hope everyone has a lovely <time>!\n💜 <('u '<)",
  "L(-_- L)\n/(o - o /)\n*boi*",
  "\\ (^-w-^) /",
  "(' o')7\n(' u')/",
  "You're doing the best you can!\n<('. '<)",
  "oh dear.",
  "Hope <name> has a wonderful day! <('u '<)",
  "c('u 'c)",
  `(>' u')> ${purpleHeart}\nWe're always here for you!`
];

// Logs the bot into the Discord platform.
bot.login(token);
console.log("Bot user successfully logged in to Discord!");

bot.on("ready", () => {
  let { version } = require("./package.json");
  bot.user.setStatus("online");
  console.log(`${bot.user.username} v${removeEndingZeroes(version)} is online and ready!`);
  try { bot.channels.cache.get(loggingChannel).send(`**${bot.user.username} v${removeEndingZeroes(version)}** is online and ready!`); }
  catch (e) { console.log("Couldn't send startup message to logging channel!\n", e); }

  function removeEndingZeroes(version) {
    // If the third digit in the version number is 0, remove it from the string. Otherwise, leave it alone.
    if (version.split(".")[2] == 0) return version.slice(0, version.length - 2);
    return version;
  }
});

bot.on("message", message => {
  if (message.author.bot || message.channel.type === "dm") return;
  else if (!message.guild.available) return;

  if (message.content.includes(purpleHeart)) {
    let sentence = sayings[(Math.floor(Math.random() * (Math.floor(sayings.length) - Math.ceil(1) + 1) ) + Math.ceil(1)) - 1];
    if (sentence == sayings[0]) {
      // replace the placeholder numbers to the corresponding time of day
      var date = new Date();
      var hour = date.getHours();
      if (hour >= 23 || hour < 6) {
        return message.channel.send("Hope everyone has a lovely night! Sweet dreams!\n💜 <('u '<)");
      }
      else if (hour >= 19) {
        return message.channel.send(sentence.replace('<greeting>', 'evening').replace('<time>', 'night'));
      }
      else if (hour >= 12) {
        return message.channel.send(sentence.replace('<greeting>', 'afternoon').replace('<time>', 'day'));
      }
      else if (hour >= 6) {
        return message.channel.send(sentence.replace('<greeting>', 'morning').replace('<time>', 'day'));
      }
    }
    if (sentence == sayings[6]) {
      return message.channel.send(sentence.replace('<name>', `**${message.author.username}**`));
    }
    else {
      return message.channel.send(sentence);
    }
  }
  else if (message.content.includes(brokenHeart)) {
    return message.channel.send(`(>' n')> ${brokenHeart}\n(>' .')> ${brokenHeart}   <('U '<)\n(>' u')> 💜 <('U '<)`);
  }
  else if (message.content == "!sd") {
    if (message.author.id !== ownerID) return;
    message.channel.send(`Good night!~\n(${bot.user.username} shutting down...)`);
    setTimeout(function () {
      process.exit();
    }, 1000);
  }
});
