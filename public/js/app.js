console.log('client side javascript message')

// const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/boston.json?access_token=pk.eyJ1Ijoib3ZpZW1lcmxvIiwiYSI6ImNsdDEya3Z5YTE4MnEycnBwcHI4cm5zZWsifQ.UpVajPFAaCqpWnpiHBJHeA&limit=1'

// fetch(url).then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.features[0].place_name + ' latitude is ' + data.features[0].center[1] )
//         }
//     })
// })

const weatherForm = document.getElementById('weatherForm')

const search = document.querySelector('input')
const messageOne = document.querySelector('#loc')
const messageTwo = document.querySelector('#lat')

//design a logic to apply the search query as an input for the weather forecast data
//Traget the form element and add event listener to run the fetch code
weatherForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    const location = search.value;
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location +'.json?access_token=pk.eyJ1Ijoib3ZpZW1lcmxvIiwiYSI6ImNsdDEya3Z5YTE4MnEycnBwcHI4cm5zZWsifQ.UpVajPFAaCqpWnpiHBJHeA&limit=1'

    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if (data.error) {
               return messageOne.textContent = data.error}
            // } else if (data.features && data.features.length > 0) {
            //     messageOne.textContent = data.features[0].place_name
            //     messageTwo.textContent = data.features[0].center[1]
            // } else {
            //     messageOne.textContent = "Invalid address entered"
            //     messageTwo.textContent = "Latitude cannot populate for invalid address"
            // }
            // console.log('Updated Location:', data.features[0].place_name);
            // console.log('Updated Latitude:', data.features[0].center[1]); 
            else if (data.features && data.features.length > 0) { 
                const latitude = data.features[0].center[1]
                const longitude = data.features[0].center[0]
                messageOne.textContent = data.features[0].place_name
                const url1 = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude +'&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m'

                fetch(url1).then((response)=>{
                    response.json().then((data)=>{
                        messageTwo.textContent = 'It is currently ' + data.current.temperature_2m + data.current_units.temperature_2m
    
                    })
                })
            } else {
                    messageOne.textContent = "Invalid address entered"
                    messageTwo.textContent = "Forecast cannot populate for invalid address"} 
            

            
            
        })
    })
    
})

