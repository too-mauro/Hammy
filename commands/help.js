/* This command shows all the commands the bot currently offers. Without an argument,
it shows all of them by category, and shows more information about each if used
as an argument. */

const {MessageEmbed} = require("discord.js");
const {readFileSync, readdirSync} = require("fs");
const {stripIndents} = require("common-tags");
const {purple_light} = require("../config/colors.json");

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "commands"],
        usage: "(command)",
        description: "Shows all the commands that Hammy has to offer.",
        category: "general"
    },
    run: async (bot, message, args) => {

      // get server's prefix
      const {prefix} = JSON.parse(readFileSync(`./config/settings.json`, 'utf8'));

      const embed = new MessageEmbed()
          .setColor(purple_light)
          .setTitle(`${bot.user.username} Help`);

      if (!args || args.length < 1) {
          // Show all commands in one message embed.
          embed.setDescription(`Use the command format \`${prefix}help <command>\` to view more info about a command.`);
          const commands = readdirSync("./commands/");
          let visibleCommands = bot.commands.filter(c => c.config.category.toLowerCase() !== "owner");
          if (visibleCommands.size > 0) {
              embed.addField("Commands", visibleCommands.map(c => `\`${c.config.name}\``).sort().join(" "));
          }
          else embed.addField("**No commands in this category!**", "\u200b");
          embed.addField("Want me to say a phrase?", "Just type a message with a purple heart emoji (💜) in it!", false)
          .setFooter(`${bot.user.username} | Total Commands: ${visibleCommands.size}`, bot.user.displayAvatarURL());
          return message.channel.send({embed});
      }
      else {
          /* Search for a given command name. If there's no result, alert the user that it's an invalid command and check the help message again. Otherwise, show the command name, aliases (if any), usage, and description. */
          let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());
          if (!command) {
            embed.setDescription(`**Sorry, I couldn't find that command or alias**. Try doing \`${prefix}help\` to see the commands I respond to!`)
            .setFooter(bot.user.username, bot.user.displayAvatarURL());
            return message.channel.send({embed});
          }
          command = command.config;

          embed.setDescription(stripIndents`My prefix is: \` ${prefix} \`\n
          **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
          **Description:** ${command.description || "No description provided."}
          **Usage:** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : `\`${prefix}${command.name}\``}
          **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None."}`)
          .setFooter(bot.user.username, bot.user.displayAvatarURL());
          return message.channel.send({embed});
      }
    }
}
