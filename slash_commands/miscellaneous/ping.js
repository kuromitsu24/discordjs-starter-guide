const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  run: async (client, interaction) => {
    const latency = await client.ws.ping;

    await interaction.reply({
      content: `Pong ${latency}ms!`,
      ephemeral: false
    });
  },
  data: new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Used to check API latency between Client and Discord interaction times in Milliseconds.')
};
