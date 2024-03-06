const path = require('path')

const express = require('express')

const hbs = require('hbs')

const app = express()

const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define path for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials');



//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectory))

//setup static directories to serve

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Merlo Ovie'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {

        title: 'About me',
        name: 'Merlo Ovie'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
       name: 'Majiroghene Ovie',
       title: 'Help'

    })
})

app.get('/weather', (req, res)=>{
    if (!req.query.address){
        return res.send ({
            Address: "please provide address",
            forecast: 'No forecast is available without address'
        })
    } else if (req.query.address){
        const address = req.query.address;
       
        geocode( address, (error, {longitude, latitude, location} = {})=>{
            if (error) {
                return res.send({error: 'This input address is invalid'})
            } 
             
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                
                res.send({
                    location,
                    Forecast: forecastData
                })
                
              })

        })
    }
    

})



app.get('/products', (req, res)=>{
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('help404', {
        title: 'Help article is not available',
        name: 'Merlo'
    })
})

app.get('*', (req, res)=> {
    res.render('404page', {
        title: 'This Page is under construction',
        name: 'Merlo'
    })
})

//start the server
app.listen(3000, () => {
    console.log('server is running on port 3000')
})