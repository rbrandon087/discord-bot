const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  try {
    console.log(`Received message: ${message.content}`);

    if (message.author.bot || !message.content.startsWith('!')) {
      return;
    }

    const [command, ...args] = message.content.slice(1).split(' ');

    if (command === 'hello') {
      console.log('Command matched: !hello');
      message.reply('Good day sir! :)');
    }
  } catch (error) {
    console.error('Error in messageCreate event handler:', error);
  }
});

client.login('MTE5MTEyNzEwNDY1MDIzNTk5Ng.GiSgFD.-iXu5uipLtDijozI7vIikop0rJrInpuvCDJKBE');
