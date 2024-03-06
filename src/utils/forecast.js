const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude +'&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m'

    request({ url, json: true}, (error, { body}) =>{
        
        if (error) {
            callback('unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.current.temperature_2m + body.current_units.temperature_2m)
        }
    })

}

module.exports =forecast