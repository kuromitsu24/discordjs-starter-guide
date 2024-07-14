const { SlashCommandBuilder } = require('@discordjs/builders');
const { base_color } = require('../../config.json');

const moment = require('moment');

module.exports = {
  run: async (client, interaction) => {
    const snipe = await client.snipes.get(interaction.channel.id);

    if (!snipe) {
      await interaction.reply({
        content: 'There is nothing to snipe.',
        ephemeral: true
      });

      return;
    }

    let color_int = snipe.color || base_color.main;

    const snipe_embed = {
      color: parseInt(color_int.replace(/^#/, ''), 16),
      author: {
        name: snipe.author.name,
        icon_url: snipe.author.icon,
        url: snipe.author.urls
      },
      description: snipe.content,
      footer: {
        text: `Sniped at ${moment(snipe.timestamp).format('LLLL')}`
      }
    };

    await interaction.reply({
      embeds: [snipe_embed],
      ephemeral: false
    });
  },
  data: new SlashCommandBuilder()
  .setName('snipe')
  .setDescription('Retrieve a last deleted messages in the current channel.')
};
