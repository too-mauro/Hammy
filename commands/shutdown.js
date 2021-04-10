/* This command shuts down the bot. Restricted to bot owner only. */

const {ownerID} = require("../config/settings.json");

module.exports = {
    config: {
        name: "shutdown",
        aliases: ["sd"],
        usage: "",
        description: "Shuts down the bot. Restricted to bot owner.",
        category: "owner"
    },
    run: async (bot, message, args) => {

      if (message.author.id != ownerID) {
        return message.channel.send(`Can't let you do that **${message.author.username}**, you have to be bot owner uwu`);
      }

      message.channel.send("Are you *sure* you want to shut me off? (y/n)")
      .then(() => {
        message.channel.awaitMessages(response => response.content === 'yes' || response.content === 'y' || response.content === 'no' || response.content === 'n', {
          max: 1,
          time: 10000,
          errors: ['time'],
        })
        .then((collected) => {
          if (collected.first().content.toLowerCase() === 'yes' || collected.first().content.toLowerCase() === 'y') {
            try {
              message.channel.send(`Good night!~\n(${bot.user.username} shutting down...)`);
              console.log(`${bot.user.username} shutting down...`);
              setTimeout(function () { process.exit(); }, 1000);
            }
            catch(e) { return message.channel.send(`Whoops, something went wrong! Here's the error: ${e.message}`); }
          }
          if (collected.first().content.toLowerCase() === 'no' || collected.first().content.toLowerCase() === 'n') {
            return message.channel.send("The operation's been cancelled.");
          }
          })
          .catch(() => {
            message.channel.send("Time's up!");
          });
      });

    }
}
