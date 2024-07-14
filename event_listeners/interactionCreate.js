module.exports = {
  run: async (client, interaction) => {
    if (!interaction.isCommand()) {
      return;
    }

    if (!interaction.guild) {
      await interaction.reply({
        content: '⛔ | Slash Command cannot be executed inside Direct Messages!',
        ephemeral: false
      });

      return;
    }

    const slash_commands = await client.slash_commands.get(interaction.commandName);

    if (!slash_commands) {
      return;
    }

    try {
      await slash_commands.run(client, interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error occured when trying to run this Slash Command, please try again later.',
        ephemeral: true
      });

      return;
    }
  },
  name: 'interactionCreate',
  once: false
};
