const {
    SlashCommandBuilder
} = require("discord.js");

const manager = require("../server/ServerManager");

module.exports = {

    data: new SlashCommandBuilder()

        .setName("list")

        .setDescription("List Minecraft Servers"),

    async execute(interaction) {

        const servers = await manager.list();

        if (!servers.length)
            return interaction.reply("Tidak ada server.");

        await interaction.reply(
            servers.map(s => "• " + s).join("\n")
        );

    }

}
