const {ownerID} = require("../config/settings.json");

module.exports = {
    config: {
        name: "reload",
        aliases: ["rel"],
        usage: "<command(s) to reload>",
        description: "Reloads Hammy's commands. Restricted to bot owner.",
        category: "owner"
    },
    run: async (bot, message, args) => {

      if (message.author.id != ownerID) {
        return message.channel.send(`Can't let you do that **${message.author.username}**, you have to be bot owner uwu`);
      }
      else if (!args || args.length < 1) {
        return message.channel.send(`**${message.author.username}**, please provide one or more commands to reload!`);
      }

      let successfulReloads = [];
      let failedReloads = [];
      args.forEach(cmdToReload => {
          cmdToReload = cmdToReload.toLowerCase();
          let loadedCommand = bot.commands.get(cmdToReload) || bot.commands.get(bot.aliases.get(cmdToReload));
          if (!loadedCommand) {
            console.error(`A command or alias with the name "${cmdToReload}" doesn't exist!`);
            return failedReloads.push({command: cmdToReload, reason: "command/alias does not exist"});
          }

          try {
            bot.commands.delete(loadedCommand.config.name);
            let reloadedCommand = require(`./${loadedCommand.config.name}.js`);
            bot.commands.set(reloadedCommand.config.name, reloadedCommand);
            if (reloadedCommand.config.aliases) {
              reloadedCommand.config.aliases.forEach(alias => {
                bot.aliases.set(alias, reloadedCommand.config.name);
              });
            }
            delete require.cache[require.resolve(`./${loadedCommand.config.name}.js`)];
            console.log(`Successfully reloaded the "${reloadedCommand.config.name}" command.`);
            successfulReloads.push(reloadedCommand.config.name);
          }
          catch (err) {
            console.error(`Couldn't reload the "${cmdToReload}" command!`, err.message);
            return failedReloads.push({command: cmdToReload, reason: err.message});
          }
      });

      let result;
      let errorMsgs = "";
      for (let f = 0; f < failedReloads.length; f++) {
        errorMsgs += `${failedReloads[f].command}: ${failedReloads[f].reason}\n`;
      }

      if (successfulReloads.length > 0 && failedReloads.length < 1) {
        result = `Successfully reloaded ${successfulReloads.length} command(s): \`${successfulReloads.join(", ")}\``;
      }
      else if (successfulReloads.length > 0 && failedReloads.length > 0) {
        result = `Successfully reloaded ${successfulReloads.length} command(s): \`${successfulReloads.join(", ")}\`\nFailed to reload ${failedReloads.length} command(s): \`\`\`${errorMsgs}\`\`\``;
      }
      else {
        result = `Failed to reload ${failedReloads.length} command(s): \`\`\`${errorMsgs}\`\`\``;
      }
      return message.channel.send(result);

    }
}
