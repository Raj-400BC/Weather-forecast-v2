getData();
let dataFetched = false;
async function getData() {
  const response = await fetch("/api");
  const data = await response.json();
  for (const item of data) {
    const root = document.createElement("div");
    const name = document.createElement("div");
    const coord = document.createElement("div");
    const temp = document.createElement("div");
    const speed = document.createElement("div");
    const weather = document.createElement("div");
    const description = document.createElement("div");

    name.textContent = `City Name: ${item.name}`;
    coord.textContent = `Latitude: ${item.coord.lat}, Longitude: ${item.coord.lon}`;
    temp.textContent = `Temperature: ${item.main.temp}°C`;
    speed.textContent = `Wind Speed: ${item.wind.speed} m/s`;
    weather.textContent = `Weather Condition: ${item.weather[0].main}`;
    description.textContent = `Weather Description: ${item.weather[0].description}`
    root.append(name, coord, temp ,speed , weather ,description);
    document.body.append(root);
  } 
  console.log(data);
}
