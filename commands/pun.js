// This command responds with a random pun.

const fetch = require("node-fetch");

module.exports = {
  config: {
      name: "pun",
      description: "I'll tell you a pun, why not?",
      usage: "",
      aliases: ["p", "j", "joke"]
  },
  run: async (bot, message, args) => {
    try {
      const joke = await fetch("https://official-joke-api.appspot.com/jokes/random").then(res => res.json());
      message.channel.send(`${joke.setup}\n**${joke.punchline}**`);
    }
    catch (err) {
      console.error(err);
      return message.channel.send("I can't think of something right now ;w;\nTry again later!");
    }

  }
}
