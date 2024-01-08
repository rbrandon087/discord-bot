const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,] });
const fetch = require('node-fetch');
const axios = require('axios');


const weatherStackApiKey = '3675aab822163044e0d91dc71330eb66';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Weather API here

// Fetch API Quote
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
client.on('messageCreate', async (message) => {
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
      getQuote().then((quote) => message.reply(quote));
    } else if (message.content.toLowerCase() === '!weather') {
      const cityName = 'Las Vegas';

      const response = await axios.get(
        `http://api.weatherstack.com/current?access_key=${weatherStackApiKey}&query=${cityName}`
      );
      const weatherData = response.data.current;

      const embed = new EmbedBuilder()
        .setTitle(`Current Weather in ${cityName}`)
        .addField('Temperature', `${weatherData.temperature} °C`, true)
        .addField('Condition', weatherData.weather_descriptions[0], true)
        .addField('Humidity', `${weatherData.humidity}%`, true)
        .addField('Wind Speed', `${weatherData.wind_speed} m/s`, true);

      message.channel.send(embed);
    }
  } catch (error) {
    console.error('Error in messageCreate event handler:', error);
  }
});


client.login('MTE5MTEyNzEwNDY1MDIzNTk5Ng.G70gPO.T4NLvz0BHWxQYwoVYex_jhQWKRQWmftdHFBzc8');
