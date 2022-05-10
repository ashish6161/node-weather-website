const postman = require('postman-request')


geocode = (location, callback) =>{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token=pk.eyJ1IjoiYXNoaXNodWszOCIsImEiOiJjbDEzOXRpdXQwMTYxM2tveDljbmgwczh4In0.2LzS7X9cAzIWfRdf6llyrQ&limit=1' 
    // console.log(url)
//     postman({url, json:true}, (error, {body})=>{

//         if(error){
            
//             callback('Unable to connect')
//         } else if(body.error){
            
//         } else{
//             // console.log(response.body.features[0].context[1].text)
//             callback(undefined, 
//                 {
//                     longitude :body.features[0].geometry.coordinates[0],
//                     latitude: body.features[0].geometry.coordinates[1],
//                     address: body.features[0].place_name
//                 }
                
//             )}

//     })
// }

postman({ url, json: true }, (error, { body }) => {
    if (error) {
        callback('Unable to connect to location services!', undefined)
    } else if (body.features.length === 0) {
        callback('Unable to find location. Try another search.', undefined)
    } else {
        callback(undefined, {
            latitude: body.features[0].geometry.coordinates[1],
            longitude :body.features[0].geometry.coordinates[0],
            location: body.features[0].place_name
        })
    }
})
}

module.exports = geocode





// postman({url: urlGeo, json: true}, (error, response)=>{
//     const data = (response.body)
// if(error){

//     console.log('Unbale to connect, please check your internet connection')

// } else if(data.features.length==0) {

//     console.log('No location found with query '+ data.query[0])

// }

// else{

//     const longitude = data.features[0].center[0]
//     const latitude = data.features[0].center[1] 
//     console.log(longitude, latitude)

// }
    
// })
