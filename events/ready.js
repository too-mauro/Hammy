const { loggingChannel } = require("../config/settings.json");
const { version } = require("../package.json");

module.exports = async (bot) => {

  // Set bot's status to online.
  bot.user.setStatus("online");
  console.log(`${bot.user.username} v${removeEndingZeroes(version)} is online and ready!`);

  // Send a startup message to the log channel.
  try { bot.channels.cache.get(loggingChannel).send(`**${bot.user.username} v${removeEndingZeroes(version)}** is online and ready!`); }
  catch(e) { console.log("Couldn't send the start-up message to the log channel!\n", e); }

}

function removeEndingZeroes(version) {
  // If the third digit in the version number is 0, remove it from the string. Otherwise, leave it alone.
  if (version.split(".")[2] == 0) return version.slice(0, version.length - 2);
  return version;
}
