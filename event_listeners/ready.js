const { ActivityType } = require('discord.js');

module.exports = {
  run: async (client) => {
    client.user.setPresence({
      activities: [
        {
          name: 'Activity Name',
          type: ActivityType.Playing // supported activity type class: Playing, Listening, Watching, and Streaming
        }
      ],
      status: 'online' // supported status type class: online, idle, dnd, and invisible
    });
    // send a log when your App is ready
    console.log(`\n+ ${client.user.username} is READY!\n`);
  },
  name: 'ready',
  once: true
};
