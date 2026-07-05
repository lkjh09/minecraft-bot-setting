const { SlashCommandBuilder } = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Bot Ping"),

    async execute(interaction){

        await interaction.reply("🏓 Pong!");

    }

}
