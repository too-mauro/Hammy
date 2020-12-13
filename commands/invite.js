/* This command returns an invite link to the support server, the bot, and a link
to the GitHub repository. */

const { MessageEmbed } = require("discord.js");
const { purple_light } = require("../config/colors.json");

module.exports = {
    config: {
        name: "invite",
        description: "Useful links for joining the support server, inviting the bot, and checking out the GitHub code.",
        aliases: ["inv", "links", "link"],
        usage: ""
    },
    run: async (bot, message, args) => {

      let embed = new MessageEmbed()
          .setColor(purple_light)
          .setTitle(`${bot.user.username} Invites`)
          .setThumbnail(bot.user.displayAvatarURL())
          .addField("**Support Server**", "[Come chill in the Rockin' Treehouse!](https://discord.com/invite/UA6tK26)")
          .addField("**Bot Invite Link**", "[Invite me to your server!](https://discord.com/oauth2/authorize?&client_id=702620769284390992&scope=bot&permissions=264192)")
          .addField("**GitHub Repository**", "[Check out my source code!](https://github.com/too-mauro/Hammy)")
          .setFooter(bot.user.username, bot.user.displayAvatarURL());

      return message.channel.send(embed);
    }
}
