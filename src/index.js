require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    Collection
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.commands = new Collection();

client.once("ready", () => {
    console.log(`${client.user.tag} Online`);
});

client.login(process.env.DISCORD_TOKEN);
