require('dotenv').config();

const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.GuildMember,
    Partials.Message,
    Partials.Channel,
    Partials.User
  ],
  disabledEvents: [
    "TYPING_START"
  ],
  autoReconnect: true
});

client.text_commands = new Collection();
client.slash_commands = new Collection();

client.snipes = new Map();

const { readdirSync } = require('fs');

// load text_commands directory path
const text_command_folders = readdirSync('./text_commands');
for (const folder of text_command_folders) {
  const text_command_files = readdirSync(`./text_commands/${folder}`).filter((file) => file.endsWith('.js'));
  for (const file of text_command_files) {
    const text_commands = require(`./text_commands/${folder}/${file}`);
    client.text_commands.set(text_commands.name, text_commands);
  };
};

const slash_command_data = [];

// load slash_commands directory path
const slash_command_folders = readdirSync('./slash_commands');
for (const folder of slash_command_folders) {
  const slash_command_files = readdirSync(`./slash_commands/${folder}`).filter((file) => file.endsWith('.js'));
  for (const file of slash_command_files) {
    const slash_commands = require(`./slash_commands/${folder}/${file}`);
    client.slash_commands.set(slash_commands.data.name, slash_commands);
    slash_command_data.push(slash_commands.data.toJSON());
  };
};

const colors = require('@colors/colors');

let refreshing_slash = `+ Started refreshing application ${'{/}'.blue} commands...`;
let refreshed_slash = `+ ${'Successfully'.green} refreshed.`;

const { REST } = require('@discordjs/rest');
const { Routes } = require('@discord-api-types/v10');

const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN);

(async () => {
  try {
    console.log(refreshing_slash);
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: slash_command_data });
    console.log(refreshed_slash);
  } catch (error) {
    console.error(error);
  }
})();

// load event_listeners directory path
const event_listener_files = readdirSync('./event_listeners').filter((file) => file.endsWith('.js'));
for (const file of event_listener_files) {
  const event_listeners = require(`./event_listeners/${file}`);
  if (event_listeners.once) {
    client.once(event_listeners.name, (...args) => event_listeners.run(client, ...args));
  } else {
    client.on(event_listeners.name, (...args) => event_listeners.run(client, ...args));
  }
};

client.login(process.env.CLIENT_TOKEN).catch(console.error);
