const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,] });
const fetch = require('node-fetch');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Fetch Api Quote
function getQuote() {
  return fetch("https://type.fit/api/quotes")
    .then(res => res.json())
    .then(data => {

      console.log('API Response:', data);

      if (Array.isArray(data) && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const quote = data[randomIndex]?.text;
        const author = data[randomIndex]?.author;

        if (quote && author) {
          return `${quote} - ${author}`;
        } else {
          throw new Error('Invalid response from the API');
        }
      } else {
        throw new Error('Empty or invalid response from the API');
      }
    })
    .catch(error => {
      console.error('Error fetching quote:', error);
      throw error; // rethrow the error to handle it outside the function
    });
}


// Listen for commands
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
    } else if (command === 'quote') {
      console.log('Command matched: !quote');
      getQuote().then(quote => message.reply(quote));
    }
    } catch (error) {
    console.error('Error in messageCreate event handler:', error);
  }
});


client.login('MTE5MTEyNzEwNDY1MDIzNTk5Ng.GK3Kby.2o_I40sSktfIdlP9YZw9iHRG3Lf3AJfs-RqEL0');
