const Discord = require('discord.js')
const config = require('./config.js')
const client = new Discord.Client()
var youtube = require('./youtube.js')
var spotify = require('./spotify')
var weather = require('./openweathermap.js')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`)
})

client.on('message', msg => {
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return

  // recherche youtube
  youtube.searchYoutube(msg)

  //  recherche spotify
  spotify.spotify(msg)

  weather.Now(msg)
  weather.Forecast(msg)
})
client.login(config.token)
