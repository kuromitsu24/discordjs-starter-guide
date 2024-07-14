const { prefix, base_color, developer_ids } = require('../config.json');

module.exports = {
  run: async (client, message) => {
    const mentioned = new RegExp(`^<@!?${client.user.id}>( |)$`);

    if (message.content.match(mentioned)) {
      const mentioned_embed = {
        color: parseInt(base_color.main.replace(/^#/, ''), 16),
        title: 'DATTEBAYO!',
        description: '🗿'
      };

      await message.reply({
        embeds: [mentioned_embed],
        allowedMentions: { repliedUser: false }
      });

      return;
    }

    if (!message.content.startsWith(prefix) || message.author.bot) {
      return;
    }

    if (!message.guild) {
      await message.reply({
        content: 'Text Command cannot be used inside Direct Messages!',
        allowedMentions: { repliedUser: false }
      });

      return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const data_name = args.shift().toLowerCase();

    const text_commands = await client.text_commands.get(data_name) || client.text_commands.find((cmd) => cmd.alias && cmd.alias.includes(data_name));

    if (!text_commands) {
      return;
    }

    // ignore a user when trying to execute the developer only text commands
    if (text_commands.developer && !developer_ids.includes(message.author.id)) {
      return;
    }

    try {
      await text_commands.run(client, message, args);
    } catch (error) {
      console.error(error);
      await message.reply({
        content: 'There was an error occured when trying to run this Text Command, please try again later.',
        allowedMentions: { repliedUser: false }
      });

      return;
    }
  },
  name: 'messageCreate',
  once: false
};
