const {ownerID} = require("../config/settings.json");

module.exports = {
    config: {
        name: "load",
        aliases: ["l"],
        usage: "<command(s) to load>",
        description: "Loads Hammy's commands. Restricted to bot owner.",
        category: "owner"
    },
    run: async (bot, message, args) => {

      if (message.author.id != ownerID) {
        return message.channel.send(`Can't let you do that **${message.author.username}**, you have to be bot owner uwu`);
      }
      else if (!args || args.length < 1) {
        return message.channel.send(`**${message.author.username}**, please provide the full name of one or more new command to load! (Don't enter an alias.)`);
      }

      let successfulLoads = [];
      let failedLoads = [];
      args.forEach(cmdToLoad => {
          cmdToLoad = cmdToLoad.toLowerCase();
          if (bot.commands.get(cmdToLoad) || bot.commands.get(bot.aliases.get(cmdToLoad))) {
            console.error(`A command or alias with the name "${cmdToLoad}" already exists!`);
            return failedLoads.push({command: cmdToLoad, reason: "command/alias already exists"});
          }

          let found = false;
          try {
            let commandList = readdirSync("./commands").filter(d => d.endsWith(".js"));
            for (let file of commandList) {
              if (found) return;
              else if (file == `${cmdToLoad}.js`) {
                let command = require(`./${file}`);
                bot.commands.set(command.config.name, command);
                if (command.config.aliases) {
                  command.config.aliases.forEach(alias => {
                    bot.aliases.set(alias, command.config.name);
                  });
                }
                delete require.cache[require.resolve(`./${file}`)];
                console.log(`Successfully loaded the "${command.config.name}" command.`);
                successfulLoads.push(command.config.name);
                found = true;
                break;
              }
            }

            if (!found) {
              console.error(`Could not find the "${cmdToLoad}" command!`);
              return failedLoads.push({command: cmdToLoad, reason: "command could not be found"});
            }
          }
          catch (err) {
            console.error(`Couldn't load the "${cmdToLoad}" command! ${err.message}`);
            failedLoads.push({command: cmdToLoad, reason: err.message});
          }
      });

      let result;
      let errorMsgs = "";
      for (let f = 0; f < failedLoads.length; f++) {
        errorMsgs += `${failedLoads[f].command}: ${failedLoads[f].reason}\n`;
      }

      if (successfulLoads.length > 0 && failedLoads.length < 1) {
        result = `Successfully loaded ${successfulLoads.length} command(s): \`${successfulLoads.join(", ")}\``;
      }
      else if (successfulLoads.length > 0 && failedLoads.length > 0) {
        result = `Successfully loaded ${successfulLoads.length} command(s): \`${successfulLoads.join(", ")}\`\nFailed to load ${failedLoads.length} command(s): \`\`\`${errorMsgs}\`\`\``;
      }
      else {
        result = `Failed to load ${failedLoads.length} command(s): \`\`\`${errorMsgs}\`\`\``;
      }
      return message.channel.send(result);

    }
}
