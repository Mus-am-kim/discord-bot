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
  // Check if the message has been posted in a channel where the bot operates
  // and that the author is not the bot itself
  if (msg.channel.type !== 'dm' && (config.channel !== msg.channel.id || msg.author.id === client.user.id)) return
  // dm=directmessage
 
  // If message is hello, post hello too
  
  // recherche youtube
  youtube.searchYoutube(msg)

  

  //  recherche spotify
  spotify.spotify(msg)

  //  météo 
  weather.Now(msg)
  weather.Forecast(msg)
})
client.login(config.token)
