
const {ownerID} = require("../config/settings.json");

module.exports = {
    config: {
        name: "unload",
        aliases: ["ul"],
        usage: "<command(s) to unload>",
        description: "Unloads Hammy's commands. Restricted to bot owner.",
        category: "owner"
    },
    run: async (bot, message, args) => {

      if (message.author.id != ownerID) {
        return message.channel.send(`Can't let you do that **${message.author.username}**, you have to be bot owner uwu`);
      }
      else if (!args || args.length < 1) {
        return message.channel.send(`**${message.author.username}**, please provide one or more commands to unload!`);
      }

      let successfulUnloads = [];
      let failedUnloads = [];
      args.forEach(cmdToUnload => {
          cmdToUnload = cmdToUnload.toLowerCase();
          let command = bot.commands.get(cmdToUnload) || bot.commands.get(bot.aliases.get(cmdToUnload));
          if (!command) {
            console.error(`A command or alias with the name "${cmdToUnload}" doesn't exist!`);
            return failedUnloads.push({command: cmdToUnload, reason: "command/alias does not exist"});
          }

          try {
            bot.commands.delete(command.config.name);
            console.log(`Successfully unloaded the "${command.config.name}" command.`);
            successfulUnloads.push(command.config.name);
          }
          catch (err) {
            console.error(`Couldn't unload the "${cmdToLoad}" command!`, err.message);
            failedUnloads.push({command: cmdToUnload, reason: err.message});
          }
      });

      let result;
      let errorMsgs = "";
      for (let f = 0; f < failedUnloads.length; f++) {
        errorMsgs += `${failedUnloads[f].command}: ${failedUnloads[f].reason}\n`;
      }

      if (successfulUnloads.length > 0 && failedUnloads.length < 1) {
        result = `Successfully unloaded ${successfulUnloads.length} command(s): \`${successfulUnloads.join(", ")}\``;
      }
      else if (successfulUnloads.length > 0 && failedUnloads.length > 0) {
        result = `Successfully unloaded ${successfulUnloads.length} command(s): \`${successfulUnloads.join(", ")}\`\nFailed to unload ${failedUnloads.length} command(s): \`\`\`${errorMsgs}\`\`\``;
      }
      else {
        result = `Failed to unload ${failedUnloads.length} command(s): \`\`\`${errorMsgs}\`\`\``;
      }
      return message.channel.send(result);
    }
}
