const colors = require('@colors/colors');

module.exports = {
  run: async (client, message) => {
    // try and catch block any errors
    try {
      // ignore message deletions from Direct Messages or from other Apps/Bots
      if (!message.guild || message.author.bot) {
        return;
      }
    } catch (error) {
      return;
    }

    // ignore partial messages
    if (message.partial) {
      return;
    }

    // ignore attachments and stickers deletion
    if (message.attachments.size > 0 || message.stickers.size > 0) {
      return;
    }

    let snipe_confirmed = `${' INFO '.black.bgWhite} Snipes ${'CONFIRMED'.green} from #${message.channel.name} (@${message.author.username})\n`;
    let snipe_declined = `${' INFO '.black.bgWhite} Snipes ${'DECLINED'.red} from #${message.channel.name} (@${message.author.username})\n`;

    // try and catch block any erros
    try {
      // set snipes based on channel ID
      await client.snipes.set(message.channel.id, {
        color: message.member.displayHexColor,
        author: {
          name: message.member.displayName,
          icon: message.member.displayAvatarURL(),
          urls: `https://discord.com/users/${message.author.id}`
        },
        content: message.content,
        timestamp: message.createdTimestamp
      });
      // send a log when your apps is collected the deleted messages
      console.log(snipe_confirmed);
    } catch (error) {
      console.log(snipe_declined);
      console.error(error);
      return;
    }
  },
  name: 'messageDelete',
  once: false
};
