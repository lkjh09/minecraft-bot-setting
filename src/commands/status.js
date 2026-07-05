const { SlashCommandBuilder } = require("discord.js");
const os = require("os");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("status")
        .setDescription("Server Status"),

    async execute(interaction){

        const ram = Math.round(
            (os.totalmem()-os.freemem())/1024/1024/1024
        );

        const total = Math.round(
            os.totalmem()/1024/1024/1024
        );

        await interaction.reply({

            content:
`CPU : ${os.cpus().length} Core
RAM : ${ram}/${total} GB
Platform : ${os.platform()}`

        });

    }

}
