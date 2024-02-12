import express, { response } from "express";
import Datastore from "nedb";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.listen(3001, () => console.log("listening at 3001"));
app.use(express.static("public"));
app.use(
  express.json({
    limit: "1mb",
  })
);
const database = new Datastore("database.db");
database.loadDatabase();
app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    
    response.json(data);
  });
});
app.post("/api", async (request, response) => {
  const data = request.body;
  const apiKey = process.env.API_KEY;
  const airQualityAPI = `https://api.openaq.org/v1/latest?coordinates=40.73,-73.99`;
  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${data.latitude}&lon=${data.longitude}&units=metric&appid=${apiKey}`;

  try {
    // Use Promise.all to fetch data from both APIs concurrently
    const [airQualityResponse, weatherResponse] = await Promise.all([
      fetch(airQualityAPI),
      fetch(weatherAPI)
    ]);

    // Parse the responses
    const airQualityData = await airQualityResponse.json();
    const weatherData = await weatherResponse.json();

    // Insert data into the database (assuming you have a 'database' object)
    database.insert({ airQuality: airQualityData, weather: weatherData });

    // Send the combined response back to the client
    response.json({ airQuality: airQualityData, weather: weatherData });
  } catch (error) {
    console.error("Error fetching data:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});
// database.remove({}, { multi: true }); 
