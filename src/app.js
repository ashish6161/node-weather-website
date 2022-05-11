//// *******/
//*
// Server set at port 3000 and can be teted using http://localhost:3000
//*
// *******//

const path = require('path') //It can be used to manipulate directory path
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //This set the default server folder


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Home Page',
        author: 'Ashish Shukla'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        heading: 'This is a Help Page',
        author: 'Ashish Shukla'
    })
})
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Page',
        author: 'Ashish Shukla'
    })
})


// app.get('/weather', (req, res)=>{

//     if(!req.query.address){
//         res.render('weather', {
//             error: 'Please provide an address!'
//         })
//     } else{

//         geocode(req.query.address, (error, {latitude, longitude, address}={})=>{

//             if(error){
//                 return res.send({error})
//             }
            
//             forecast(latitude, longitude, (error, forecastData)=>{
//                 if(error){
//                     return res.send( {error} )
//                 }
//                 //console.log(address)
//                 //console.log(forecastData.weather)

//                 res.render('weather', {
//                     forecast: forecastData.weather,
//                     address,
//                     location: req.query.address
//                 })
                
//                     // location: 'address',
//                     // teperature: 'forecastData.weather'
                
//             })
//         })

        
//     }

    
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/products', (req, res)=>{

    // req.query keeps all the query string value 
    //console.log(req.query)

    if(!req.query.search){
        res.send({
            error: 'Please enter a search term'
        })
    }
    
    res.send({
        products:[]
    })

})

app.get('/search', (req, res)=>{

    if(!req.query.search){
        res.send({
            error: 'Please enter something to search'
        })
    } else {
        res.send({
            Search : 'This is search text ' + req.query.search
        })
    }
})

// Set page specific 404 page like help page it can be done using path followed by '*'
app.get('/help/*', (req, res)=>{
    res.send('<h3>Help article not found</h3>')
})


// Set 404 page (it must be declared at the end of all the declared routes), it can be done using '*'
app.get('*', (req, res)=>{
    res.render('404', {
        title: '404 page',
        detail: 'Sorry, we have hit a brick wall'
    })
})


// Start the server
app.listen(port, ()=>{
    console.log('Server started on port ' + port)
}) // Start the server on port 3000 can be accesses using localhost:3000 for local environment

