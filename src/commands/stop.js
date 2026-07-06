const { SlashCommandBuilder } = require("discord.js");
const server = require("../server/ServerProcess");

module.exports = {

data:new SlashCommandBuilder()
.setName("stop")
.setDescription("Stop Server")
.addStringOption(o=>o.setName("name").setDescription("Server").setRequired(true)),

async execute(interaction){

const name=interaction.options.getString("name");

try{

server.stop(name);

interaction.reply(`🛑 ${name} Stopped`);

}catch(e){

interaction.reply(e.message);

}

}

}
