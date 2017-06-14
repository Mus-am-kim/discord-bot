var weather = require('node-rest-client-promise').Client()
var querystring = require('querystring')

module.exports = {
  Now: function (msg, callback) {
    if (msg.content.startsWith('!weather ')) {
      weather.getPromise('http://api.openweathermap.org/data/2.5/weather?q=' + msg.content.substring(9) +'&lang=fr&units=metric&APPID=d3d081b87c05ce38921069cab00d5711')
      .catch((error) => {
        throw error
      })
      .then((res) => {
        if (res.data.message === 'city not found') {
          msg.channel.send('Ville non répertoriée')
        } else {
          msg.channel.send('Météo actuelle sur ' + msg.content.substring(9) + ': ' + res.data.main.temp + '°C    Humidité: ' + res.data.main.humidity + '%    Ciel: ' + res.data.weather[0].description)
        }
        if (callback) {
          callback()
        }
      })
    }
  },
  Forecast: function (msg, callback) {
    if (msg.content.startsWith('!forecast ')) {
      weather.getPromise('http://api.openweathermap.org/data/2.5/forecast?q=' + msg.content.substring(10) +'&lang=fr&units=metric&APPID=d3d081b87c05ce38921069cab00d5711')
      .catch((error) => {
        throw error
      })
      .then((res) => {
        var text = ''
        var i = 1
        var tet=""
        msg.channel.send('les prévisions météorologiques pour les 5 prochains jours pour la ville de '+msg.content.substring(10))
        for (var j = 0; j < res.data.cnt; j = j + 8) {
          if (j > 1) { text += '\n' }
         text ='Pour le ' +res.data.list[j].dt_txt.substring(0,10) +'  : Température : ' + res.data.list[j].main.temp    + '°C   Ciel : ' + res.data.list[j].weather[0].description
          i++
          msg.channel.send(text)
        }
        msg.channel.send(tet)
        if (callback) {
          callback(tet)
        }
      })
    }
  }
}
