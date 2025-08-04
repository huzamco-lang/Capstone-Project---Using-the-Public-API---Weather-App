# 🌤️ Weather Forecast Web App

A simple and elegant Node.js web application that allows users to check the weather forecast for tomorrow in any city of their choice.

This project was built using:
- **Node.js** & **Express.js** for the server
- **Axios** to fetch weather data from the OpenWeatherMap API
- **EJS** as the templating engine
- **Bootstrap 5** for responsive styling and layout

---

## 🚀 Features

- Search by city name to get weather forecast for tomorrow
- Uses OpenWeatherMap's 5-day forecast API
- Displays:
  - Weather description
  - Temperature (°C)
  - Humidity (%)
  - Wind speed (m/s)
  - Weather icon
  - Tomorrow's full date

---

## 📦 Project Structure

```
weather-app/
├── public/                # Static files (CSS, images)
│   └── styles.css
├── views/                 # EJS templates
│   ├── index.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
├── .gitignore
├── package.json
├── app.js                 # Main server file
└── README.md
```

---

## 🛠️ Installation & Usage

1. **Clone this repository**
```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Get your OpenWeatherMap API Key**
- Sign up at [https://openweathermap.org/](https://openweathermap.org/)
- Replace the API key in `app.js` with your own:
```js
const API_KEY = "YOUR_API_KEY_HERE";
```

4. **Start the app**
```bash
node app.js
```

5. **Visit the app in your browser**
```
http://localhost:3000
```

---

## 🌐 Live Preview

> *(Optional)* You can deploy it to platforms like [Render](https://render.com/), [Railway](https://railway.app/), or [Vercel](https://vercel.com/) for live sharing.

---

## 🙌 About the Project

This app was created as part of the Capstone Project for Angela Yu's Web Development Bootcamp.  
It demonstrates practical usage of:
- Server-side rendering
- Working with public APIs
- Structuring an Express application

---


## 📝 License

This project is open-source and free to use for learning and educational purposes.
