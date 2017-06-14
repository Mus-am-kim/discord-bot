const config = require('./config.js')
var SpotifyWebApi = require('spotify-web-api-node')
var spotifyApi = new SpotifyWebApi({
  clientId: config.clientId,
  clientSecret: config.clientSecret
})

module.exports = {
  spotify: function (msg) {
    if (msg.content.lastIndexOf('!spotify') !== -1) {
      spotifyApi.clientCredentialsGrant()

      .then(function (data) {
        spotifyApi.setAccessToken(data.body['access_token'])
//
        if (msg.content.endsWith('album')) {
          var type = 0
        } else if (msg.content.endsWith('artiste')) {
          type = 1
        } else if (msg.content.endsWith('musique')) {
          type = 2
        } else {
          type = 2
        }

        if (msg.content.endsWith('artiste')) {
          var a = (msg.content).length
          var b = a - 7
          var asw = msg.content.substring(9, b)
        } else if (msg.content.endsWith('musique')) {
          a = (msg.content).length
          b = a - 7
          asw = msg.content.substring(9, b)
        } else if (msg.content.endsWith('album')) {
          a = (msg.content).length
          b = a - 5
          asw = msg.content.substring(9, b)
        } else {
          asw = msg.content.substring(9)
        }

        if (type === 0) {
          // album
          spotifyApi.searchTracks('album:' + asw)
          .then(function (data) {
            msg.channel.send('Résultats de votre recherche d\'album pour "' + asw + '"')
            if (data.body.tracks.items[0] === undefined || msg.content === ' ' || msg.content === '') {
              msg.channel.send("Votre recherche n'a pas abouti, veuillez rééssayer.")
            } else {
              for (let i = 0; i < data.body.tracks.items.length && i < 3; i++) {
                msg.channel.send('"' + data.body.tracks.items[i].album.name + '" de ' + data.body.tracks.items[i].artists[0].name + '\n' + data.body.tracks.items[i].external_urls.spotify)
              }
            }
          })
        }
        if (type === 1) {
          // artiste
          spotifyApi.searchArtists(asw)
          .then(function (data) {
            msg.channel.send('Résultats de votre recherche d\'artiste pour "' + asw + '"')
            if (data.body.artists.items[0] === undefined) {
              msg.channel.send("Votre recherche n'a pas abouti, veuillez rééssayer.")
            } else {
              for (let i = 0; i < data.body.artists.items.length && i < 3; i++) {
                msg.channel.send(data.body.artists.items[i].name + '\n' + data.body.artists.items[i].external_urls.spotify)
              }
            }
          })
        }
        if (type === 2) {
          // musiques
          spotifyApi.searchTracks('Musiques:' + asw)
          .then(function (data) {
            msg.channel.send('Résultats de votre recherche de musique pour "' + asw + '"')
            if (data.body.tracks.items[0] === undefined) {
              msg.channel.send('Une erreur a été rencontrée, veuillez rééssayer.')
            } else {
              for (let i = 0; i < data.body.tracks.items.length && i < 3; i++) {
                msg.channel.send('"' + data.body.tracks.items[i].name + '" de ' + data.body.tracks.items[i].artists[0].name + '\n' + data.body.tracks.items[i].external_urls.spotify)
              }
            }
          })
        }
        msg.channel.send('----------Résult---------')
      })
    }
  }
}
