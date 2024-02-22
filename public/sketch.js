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
      const response = await fetch("/api", options);
      const json = await response.json();
      console.log(json);
        // document.getElementById("lat").textContent = json.coord.lat.toFixed(2);
        // document.getElementById("lon").textContent = json.coord.lon.toFixed(2);
        document.getElementById("currentLocation").textContent = json.name;
        document.getElementById("temp").textContent = json.main.temp;
        document.getElementById("speed").textContent = json.wind.speed;
        document.getElementById("weather").textContent = json.weather[0].main;
        document.getElementById("description").textContent = json.weather[0].description;
        // console.log(json);
      });
    });
  });