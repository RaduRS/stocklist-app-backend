const express = require("express");
const axios = require("axios");
const router = express.Router();
const dotenv = require("dotenv").config();

router.get("/current", async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat: lat,
          lon: lon,
          appid: process.env.OPEN_WEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching weather data" });
  }
});

module.exports = router;
