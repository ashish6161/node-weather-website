const postman = require('postman-request')


forecast = (long, lat, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=f924d852f258c70a035bad7c38a95dcb&query='+long+ ','+lat
    
//     postman({url, json: true}, (error, {body})=>{ // url:url and response.body is changed to {body} as object destructuring
//         if(error){
//             callback('Unable to connect', undefined)

//         } else if(body.error){
//             callback('Location could not be found, change the search keyword, error code '+body.error.code,body.error.info )    
//         }        

//         else {
//             callback(undefined, 
//                 {weather: body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees Celsius out there, and feels like '+body.current.feelslike+' degrees Celsius. There is a '+body.current.precip+'% chance of rain'}
//             )
//         }
//     })
// }

postman({ url, json: true }, (error, { body }) => {
    if (error) {
        callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
        callback('Unable to find location', undefined)
    } else {
        callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')
    }
})
}

module.exports = forecast
