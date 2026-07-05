const {
    SlashCommandBuilder
} = require("discord.js");

const manager = require("../server/ServerManager");

module.exports = {

    data: new SlashCommandBuilder()

        .setName("create")

        .setDescription("Create Minecraft Server")

        .addStringOption(option =>
            option
                .setName("name")
                .setDescription("Server Name")
                .setRequired(true)
        ),

    async execute(interaction) {

        const name = interaction.options.getString("name");

        try {

            const dir = await manager.create(name);

            await interaction.reply(
                `✅ Server **${name}** dibuat.\nFolder:\n\`${dir}\``
            );

        } catch (err) {

            await interaction.reply({
                content: err.message,
                ephemeral: true
            });

        }

    }

}
