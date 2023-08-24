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

app.use("/auth",authRoute)
const port = process.env.PORT || 8080;
app.use(express.json()) 

app.listen(port, () => {
  console.log(`Assignment app listening on port ${port}`)
})
