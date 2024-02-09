document.addEventListener('DOMContentLoaded', function setup() {
    const button = document.getElementById('submit');
    button.addEventListener("click", async (event) => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        document.getElementById("latitude").textContent = latitude;
        document.getElementById("longitude").textContent = longitude;
        // const Api = process.env.API_KEY;
        // const response = await fetch(Api);
        // const json = await response.json();
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
        document.getElementById("temp").textContent = json.main.temp;
        document.getElementById("speed").textContent = json.wind.speed;
        document.getElementById("weather").textContent = json.weather[0].main;
        document.getElementById("description").textContent = json.weather[0].description;
        // console.log(json);
      });
    });
  });