import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();


const app = express();
const port = 3000;

const API_KEY = process.env.API_KEY;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { weather: null, error: null });
});

app.post("/", async (req, res) => {
  const city = req.body.city;

  try {
    // Step 1: Get city coordinates
    const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
    const geoResponse = await axios.get(geoURL);

    if (geoResponse.data.length === 0) {
      return res.render("index.ejs", {
        weather: null,
        error: "City not found. Please check the name.",
      });
    }

    const { lat, lon, name } = geoResponse.data[0];

    // Step 2: Get the forecast weather conditions.
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const weatherResponse = await axios.get(weatherURL);

    const forecastList = weatherResponse.data.list;

    // Tomorrow's date
    const today = new Date();
    const tomorrowStr = new Date(today.setDate(today.getDate() + 1))
      .toISOString()
      .split("T")[0];
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const tomorrowDateFormatted = new Date(tomorrowStr).toLocaleDateString("en-US", options);

    // Select midday data if available.
    const tomorrowData =
      forecastList.find((item) =>
        item.dt_txt.startsWith(tomorrowStr + " 12:00:00")
      ) ||
      forecastList.find((item) =>
        item.dt_txt.startsWith(tomorrowStr)
      );

    if (!tomorrowData) {
      return res.render("index.ejs", {
        error: "No forecast data available for tomorrow.",
      });
    }

    const weather = {
      city: name,
      description: tomorrowData.weather[0].description,
      temp: Math.round(tomorrowData.main.temp),
      humidity: tomorrowData.main.humidity,
      wind: tomorrowData.wind.speed,
      icon: tomorrowData.weather[0].icon,
    };

    res.render("index.ejs", { weather: weather, date: tomorrowDateFormatted });

  } catch (error) {
    console.error("Error:", error.message);
    res.render("index.ejs", {
      error: "Unable to retrieve weather data. Please confirm the city name.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
