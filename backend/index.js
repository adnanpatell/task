require("dotenv").config()
const express = require('express')
const passport = require('passport')
const cookieSession = require('cookie-session');
const session = require('express-session');
const passportSetup = require("./passport")
const authRoute = require("./routes/auth");
const cors = require("cors");
const axios = require("axios")

const app = express()
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true 
  }));

app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true,
}))
app.use(cors());
app.use("/auth",authRoute)
const port = process.env.PORT || 8080;
app.use(express.json()) 

app.listen(port, () => {
  console.log(`Assignment app listening on port ${port}`)
})
app.get('/fetch-images', async (req, res) => {
  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/dhh8atda3/resources/image', {
      headers: {
        Authorization: `Basic ${Buffer.from('541919539486426:H6YnY-q3ZlVCenE68A1V1jIOD6A').toString('base64')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});