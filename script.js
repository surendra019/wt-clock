let date_container = document.getElementById("date")
let day_container = document.getElementById("day")
let hours_container = document.getElementById("hours")
let temp_container = document.getElementById("temp")
let city_conatiner = document.getElementById("location")

setWeather();
setInterval(()=>{
    updateTime()
}, 1000)

function updateTime(){
    let date = new Date();
    let hours = date.getHours()
    let minutes = date.getMinutes()
   
    hours_container.innerHTML =  `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    day_container.innerHTML = date.toLocaleDateString('en-US', { weekday: 'long' });
    date_container.innerHTML = `${date.getDay()} ${date.toLocaleDateString('en-US', { month: 'long' })} ${date.getFullYear()}`
}

function setWeather(){
    let latitude;
    let longitude;
    if (navigator.geolocation) {
        // Request the current position
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Success callback
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                fetch(`http://api.weatherapi.com/v1/forecast.json?key=546373597a2d437a92944707241809&q=${latitude}, ${longitude}`).then((res)=>{
                    return res.json()
                }).then((res)=>{
                   
                    temp_container.innerHTML = `${res.current.temp_c} &deg;`;
                    city_conatiner.innerHTML = `${res.location.name}`
                })

            },
            (error) => {
                // Error callback
                console.error('Error getting location:', error);
            },
            {
                // Optional configuration
                enableHighAccuracy: true, // Use GPS if available
                timeout: 5000, // Timeout in milliseconds
                maximumAge: 0 // Cache the result (0 means no caching)
            }

        );
       
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
    
    
}


