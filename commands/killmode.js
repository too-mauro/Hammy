module.exports = {
    config: {
        name: "killmode",
        description: "Try doing this for a surprise! ~( ^ w ^ )~",
        aliases: ["murdermode", "uwukill", "genuwucide"],
        usage: "",
        category: "general"
    },
    run: async (bot, message, args) => {

        return message.channel.send(`uwu that's not very wholesome ${message.author}!! stop it T_T`);

    }
}
