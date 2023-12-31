const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.content === '!isbotonline') {
    message.reply('Yes, I am online!');
  }
});

client.login('MTE5MTEyNzEwNDY1MDIzNTk5Ng.GfrC0B.q6b8J7qK56RRY_k9EW1yoMyRTNYP4WZP9asbQg');
