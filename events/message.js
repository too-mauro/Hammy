const fs = require("fs");

module.exports = async (bot, message) => {
    /* Don't do anything if the message is in a direct message, the author is a
       bot, or the server is unavailable. */
    if (message.author.bot || message.channel.type == "dm") return;
    else if (!message.guild.available) return;

    // If a user mentions the bot outside of a command, return the server's prefix.
    const botConfig = JSON.parse(fs.readFileSync("./config/settings.json", "utf8"));
    const mentionRegex = new RegExp(`^(<@!?${bot.user.id}>)\\s*`);
    if (mentionRegex.test(message.content)) {
      return message.channel.send(`(>' u')>  My prefix is: \` ${botConfig.prefix} \``);
    }

    /* Get the prefix from the settings.json file and check if the message starts with that.
    If it does, try to find a command, then run it if one's found. */
    const cleanPrefix = message.content.substr(0, botConfig.prefix.length).toLowerCase();
    if (cleanPrefix == botConfig.prefix) {
      const args = message.content.slice(cleanPrefix.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();
      const commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
      if (commandfile) { return commandfile.run(bot, message, args); }
    }

    /* If no command is found, run through the message and see if there's a purple heart.
    Run one of the following if they apply. */
    if (message.content.includes(botConfig.purpleHeart)) {
      const phrases = JSON.parse(fs.readFileSync("./config/phrases.json", "utf8"));
      const number = (Math.floor(Math.random() * (Math.floor(phrases.phrases.length) - Math.ceil(1) + 1)) + Math.ceil(1)) - 1;
      return message.channel.send(phraseSwitch(message, phrases, number, botConfig.brokenHeart));
    }
    else if (message.content.includes(botConfig.brokenHeart)) {
      return message.channel.send(`(>' n')> ${botConfig.brokenHeart}\n(>' .')> ${botConfig.brokenHeart}   <('U '<)\n(>' u')> ${botConfig.purpleHeart} <('U '<)`);
    }
}

function phraseSwitch(message, phraseFile, randomNum, brokenHeart) {
  let sentence = phraseFile.phrases[randomNum];
  if (sentence.toLowerCase().includes("<greeting>")) {
    // return a greeting that changes with the time
    return timedGreeting(sentence);
  }
  else if (sentence.toLowerCase().includes("<name>")) {
    // replace <name> with message author's displayName
    return sentence.replace('<name>', `**${message.member.displayName}**`);
  }
  else if (sentence.toLowerCase().includes("<broken_heart>")) {
    // replace <brokenHeart> with the broken heart emote from settings.json file
    return sentence.replace('<broken_heart>', brokenHeart);
  }
  else if (sentence.toLowerCase().includes("<gender>")) {
    // replace <gender> with 'king', 'queen', or empty string depending on message author's roles
    // gender-neutral first, then he/him, then she/her
    const roleEval = roleFind(message.member.roles.cache, "They/Them", "He/Him", "She/Her");
    if (roleEval == 1) {
      return sentence.replace("<gender>", ", king");
    }
    else if (roleEval == 2) {
      return sentence.replace("<gender>", ", queen");
    }
    else {
      return sentence.replace("<gender>", "");
    }
  }
  else {
    // if none of the other cases apply, just return the phrase
    return sentence;
  }
}

function timedGreeting(greeting) {
  // Replace the placeholder numbers to the corresponding time of day
  const date = new Date();
  const hour = date.getHours();
  if (hour >= 23 || hour < 6) {
    return "Hope everyone has a lovely night! Sweet dreams!\n💜 <('u '<)";
  }
  else if (hour >= 19) {
    return greeting.replace('<greeting>', 'evening').replace('<time>', 'night');
  }
  else if (hour >= 12) {
    return greeting.replace('<greeting>', 'afternoon').replace('<time>', 'day');
  }
  else if (hour >= 6) {
    return greeting.replace('<greeting>', 'morning').replace('<time>', 'day');
  }
}

function roleFind(roleCache, role1, role2, role3) {
  // Perform the following checks: check if user has none of the passed roles or role 1, then check if user has both role 2 and role 3 (returns role 1 eval), then check for individual roles. The first check is necessary if the bot will be used on a server without the passed roles.
  if (!roleCache.find(r => r.name == role1) && !roleCache.find(r => r.name == role2) && !roleCache.find(r => r.name == role3)) { return 0; }
  else if (roleCache.find(r => r.name == role1)) { return 0; }

  if (roleCache.find(r => r.name == role2) && roleCache.find(r => r.name == role3)) { return 0; }
  else if (roleCache.find(r => r.name == role2)) { return 1; }
  else if (roleCache.find(r => r.name == role3)) { return 2; }
}
