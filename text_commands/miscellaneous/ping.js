module.exports = {
  run: async (client, message, args) => {
    const latency = await client.ws.ping;

    await message.reply({
      content: `Pong ${latency}ms!`,
      allowedMentions: { repliedUser: false }
    });
  },
  name: 'ping',
  description: 'Used to check API latency between Client and Discord interaction times in Milliseconds.',
  alias: ['ws'],
  developer: false
};
