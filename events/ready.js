/* This event runs whenever the bot starts up. This sets the bot user's status to
"online", listening to the purple heart emoji, and sends a message to the
pre-defined log channel stating the bot user is ready for use. */

const fs = require("fs");
const { removeEndingZeroes } = require("../config/util.js");

module.exports = async (bot) => {

  const botConfig = JSON.parse(fs.readFileSync("./config/settings.json", "utf8"));
  const { version } = JSON.parse(fs.readFileSync("./package.json", "utf8"));

  // Set bot's status to online.
  bot.user.setStatus("online");
  bot.user.setActivity(botConfig.purpleHeart, { type: "LISTENING" });
  console.log(botConfig.startupMessage.replace("vX", `v${removeEndingZeroes(version)}`));

  // Send a startup message to the log channel.
  try { bot.channels.cache.get(botConfig.loggingChannel).send(botConfig.startupMessage.replace("vX", `v${removeEndingZeroes(version)}`)); }
  catch(e) { console.log("Couldn't send the start-up message to the log channel!\n", e); }

}
