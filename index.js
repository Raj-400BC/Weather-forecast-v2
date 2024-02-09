import express, { response } from "express";
import Datastore from "nedb";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
const Api = process.env.API_KEY;
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
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${data.latitude}&lon=${data.longitude}&units=metric&appid=${apiKey}`;
  try {
    const fetching_response = await fetch(apiUrl);
    const respo = await fetching_response.json();
    // Insert data into the database
    database.insert(respo);
    // console.log(data.latitude);
    // console.log(respo.main.temp);
    // Send the OpenWeatherMap API response back to the client
    response.json(respo);
  } catch (error) {
    console.error("Error fetching data from OpenWeatherMap API:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});
// database.remove({}, { multi: true }); 
