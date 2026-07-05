const { SlashCommandBuilder } = require("discord.js");
const server = require("../server/ServerProcess");

module.exports = {

data:new SlashCommandBuilder()
.setName("start")
.setDescription("Start Server")
.addStringOption(o=>o.setName("name").setDescription("Server").setRequired(true)),

async execute(interaction){

const name=interaction.options.getString("name");

try{

await server.start(name);

interaction.reply(`✅ ${name} Started`);

}catch(e){

interaction.reply(e.message);

}

}

}
