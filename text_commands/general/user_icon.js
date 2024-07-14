const { base_color } = require('../../config.json');

module.exports = {
  run: async (client, message, args) => {
    const user = message.mentions.members.first() || message.member;
    const icon = user.displayAvatarURL({ dynamic: true, size: 1024 });

    let color_int = user.displayHexColor || base_color.main;

    const icon_embed = {
      color: parseInt(color_int.replace(/^#/, ''), 16),
      image: {
        url: icon
      }
    };

    await message.reply({
      embeds: [icon_embed],
      allowedMentions: { repliedUser: false }
    });
  },
  name: 'user_icon',
  description: 'Displays the icon of a user.',
  aliases: ['ui', 'avatar'],
  developer: false
};
