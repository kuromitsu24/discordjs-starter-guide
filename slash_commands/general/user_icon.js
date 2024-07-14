const { SlashCommandBuilder } = require('@discordjs/builders');
const { base_color } = require('../../config.json');

module.exports = {
  run: async (client, interaction) => {
    const user = interaction.options.getMember('user') || interaction.member;
    const icon = user.displayAvatarURL({ dynamic: true, size: 1024 });

    let color_int = user.displayHexColor || base_color.main;

    const icon_embed = {
      color: parseInt(color_int.replace(/^#/, ''), 16),
      image: {
        url: icon
      }
    };

    await interaction.reply({
      embeds: [icon_embed],
      ephemeral: false
    });
  },
  data: new SlashCommandBuilder()
  .setName('user_icon')
  .setDescription('Displays the icon of a user.')
  .addUserOption((option) =>
  option.setName('user')
  .setDescription('The user whose icon will be shown.')
  .setRequired(false))
};
