// const map = L.map("map").setView([0, 0],2);   // using this to load map even if the has not clicked the FindMe button


document.addEventListener('DOMContentLoaded', function setup() {
    const button = document.getElementById('submit');
    button.addEventListener("click", async (event) => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        document.getElementById("latitude").textContent = latitude;
        document.getElementById("longitude").textContent = longitude;
        
///////     Leaflet.js start
        const map = L.map("map").setView([0, 0],2);

        const attribution =
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
        const tileURL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
        const tiles = L.tileLayer(tileURL, { attribution });
        tiles.addTo(map);
        
        // Making marker and custom icon
        var myIcon = L.icon({
          iconUrl: "/assets/images/marker.png",
          iconSize: [50, 32],
          iconAnchor: [25, 16],
        });
        const marker = L.marker([0, 0], { icon: myIcon }).addTo(map);
        
        let firstTime = true; // to stop the zooming on each lat and lon update
        marker.setLatLng([latitude, longitude]);

        if (firstTime) {
          map.setView([latitude, longitude], 3);
          firstTime = false;
        }
    
///////     Leaflet.js end

        const data = { latitude, longitude };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      fetch("/api", options)
  .then(response => response.json())
  .then(data => {
    // Assuming the structure is { "airQuality": {...}, "weather": {...} }
    const airQualityData = data.airQuality;
    const weatherData = data.weather;

    // Update your HTML elements with the new data
    document.getElementById("currentLocation").textContent = weatherData.name;
    document.getElementById("temp").textContent = weatherData.main.temp;
    document.getElementById("speed").textContent = weatherData.wind.speed;
    document.getElementById("weather").textContent = weatherData.weather[0].main;
    document.getElementById("description").textContent = weatherData.weather[0].description;
    if (airQualityData.results && airQualityData.results[0] && airQualityData.results[0].country) {
      console.log(airQualityData.results[0].country);
    } else {
      console.error("Error: Unexpected response structure or missing data.");
    }
    

    // Handle air quality data if needed
    // const airQualityIndex = airQualityData.someProperty;
    // document.getElementById("airQualityIndex").textContent = airQualityIndex;
  })
  .catch(error => {
    console.error("Error fetching data:", error);
    // Handle errors as needed
  });
        // console.log(json);
      });
    });
  });