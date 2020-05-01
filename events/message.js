const { prefix, ownerID } = require("../config/settings.json");
let purpleHeart = '💜';
let brokenHeart = "<:hamzasux:699845663713918997>";
const fs = require("fs");

module.exports = async (bot, message) => {

    /* Don't do anything if the message is in a direct message, the author is a
       bot, or the server is unavailable. */
    if (message.author.bot || message.channel.type == "dm") return;
    else if (!message.guild.available) return;

    if (message.content.includes(purpleHeart) && message.content.includes("!")) return;
    else if (message.content.includes(purpleHeart)) {
      fs.readFile('./config/phrases.json', 'utf8', (err, data) => {
        if (err) {
          console.log(err);
          return message.channel.send("Oop, something went wrong! Try again later.");
        }
        else {
          let file = JSON.parse(data);
          let sentence = file.phrases[(Math.floor(Math.random() * (Math.floor(file.phrases.length) - Math.ceil(1) + 1) ) + Math.ceil(1)) - 1];
          switch (sentence) {
            case file.phrases[0]:
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
                break;

            case file.phrases[6]:
                // replace <name> with message author's username
                return message.channel.send(sentence.replace('<name>', `**${message.author.username}**`));
                break;

            case file.phrases[9]:
                // replace <gender> with 'king', 'queen', or empty string depending on message author's roles
                // gender-neutral first, then he/him, then she/her
                let roleEval = roleFind(message.guild.member(message.author).roles.cache, "They/Them", "He/Him", "She/Her");
                if (roleEval[0]) {
                  return message.channel.send(sentence.replace("<gender>", ""));
                }
                else if (roleEval[1]) {
                  return message.channel.send(sentence.replace("<gender>", ", king"));
                }
                else if (roleEval[2]) {
                  return message.channel.send(sentence.replace("<gender>", ", queen"));
                }
                break;

            default:
                // if none of the other cases apply, just return the phrase
                return message.channel.send(sentence);
          }
        }
      });
    }
    else if (message.content.includes(brokenHeart)) {
      return message.channel.send(`(>' n')> ${brokenHeart}\n(>' .')> ${brokenHeart}   <('U '<)\n(>' u')> 💜 <('U '<)`);
    }
    else if (message.content == `${prefix}sd`) {
      if (message.author.id !== ownerID) return;
      message.channel.send(`Good night!~\n(${bot.user.username} shutting down...)`);
      setTimeout(function () {
        process.exit();
      }, 1000);
    }
}

function roleFind(roleCache, role1, role2, role3) {
  // Perform the following checks: check if user has none of the passed roles or role 1, then check if user has both role 2 and role 3 (returns role 1 eval), then check for individual roles. The first check is necessary if the bot will be used on a server without the passed roles.
  if (!roleCache.find(r => r.name == role1) && !roleCache.find(r => r.name == role2) && !roleCache.find(r => r.name == role3)) { return [true, false, false]; }
  else if (roleCache.find(r => r.name == role1)) { return [true, false, false]; }

  if (roleCache.find(r => r.name == role2) && roleCache.find(r => r.name == role3)) { return [true, false, false]; }
  else if (roleCache.find(r => r.name == role2)) { return [false, true, false]; }
  else if (roleCache.find(r => r.name == role3)) { return [false, false, true]; }
}
