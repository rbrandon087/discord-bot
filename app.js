const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const fetch = require('node-fetch');
const axios = require('axios');

const weatherStackApiKey = '3675aab822163044e0d91dc71330eb66';

// Weather API here
class WeatherEmbed {
  constructor(cityName, weatherData) {
    this.embed = new EmbedBuilder()
      .setTitle(`Current Weather in ${cityName}`)
      .addField('Temperature', `${weatherData.temperature} °C`, true)
      .addField('Condition', weatherData.weather_descriptions[0], true)
      .addField('Humidity', `${weatherData.humidity}%`, true)
      .addField('Wind Speed', `${weatherData.wind_speed} m/s`, true);
  }

  getEmbed() {
    return this.embed;
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

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

    console.log(`Command: ${command}`);

    if (command === 'hello') {
      console.log('Command matched: !hello');
      message.reply('Good day sir! :)');
    } else if (command === 'quote') {
      console.log('Command matched: !quote');
      getQuote().then((quote) => message.reply(quote));
    } else if (message.content.toLowerCase() === '!weather') {
      console.log('Command matched: !weather');
      const cityName = 'Las Vegas';

      const response = await axios.get(
        `http://api.weatherstack.com/current?access_key=3675aab822163044e0d91dc71330eb66&query=Las Vegas`
      );
      const weatherData = response.data.current;

      const weatherEmbed = new WeatherEmbed(cityName, weatherData);
      message.channel.send({ embeds: [weatherEmbed.getEmbed()] });
      
    }
  } catch (error) {
    console.error('Error in messageCreate event handler:', error);
  }
});


client.login('MTE5MTEyNzEwNDY1MDIzNTk5Ng.GHHI_G.3k-3GV4w0O-NwfAIjgC8T01HSDQ-wycZBR6L3Q');
