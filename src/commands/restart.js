const { SlashCommandBuilder } = require("discord.js");
const server=require("../server/ServerProcess");

module.exports={

data:new SlashCommandBuilder()
.setName("restart")
.setDescription("Restart Server")
.addStringOption(o=>o.setName("name").setDescription("Server").setRequired(true)),

async execute(interaction){

const name=interaction.options.getString("name");

try{

server.restart(name);

interaction.reply(`🔄 ${name} Restarting`);

}catch(e){

interaction.reply(e.message);

}

}

}
