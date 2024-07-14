const { base_color } = require('../../config.json');
const moment = require('moment');

module.exports = {
  run: async (client, message, args) => {
    const snipe = await client.snipes.get(message.channel.id);

    if (!snipe) {
      await message.reply({
        content: 'There is nothing to snipe.',
        allowedMentions: { repliedUser: false }
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

    await message.reply({
      embeds: [snipe_embed],
      allowedMentions: { repliedUser: false }
    });
  },
  name: 'snipe',
  description: 'Retrieve a last deleted messages in the current channel.',
  aliases: ['ms'],
  developer: false
};
