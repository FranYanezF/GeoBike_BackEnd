require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const cookieSession = require("cookie-session")
const passportSetup = require("./passport")
const passport = require("passport")
const bodyParser = require('body-parser')
const tokenValidation = require('./middlewares/tokenValidation')
const { tallerRouter, authRouter} = require('./routes')
const favRoutes = require('./routes/favRoutes')
const userRouter = require('./routes/userRouter')


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
//Uso de Cookies para guardar session
app.use(cookieSession({
  name:'session',
  keys:['Geobike'],
  maxAge:24*60*60*100
}));

app.use(passport.initialize());
app.use(passport.session());

//configuracion del cors

app.use(cors({
  origin:"http://localhost:3000",
  methods:"GET,POST,DELETE,PUT",
  credentials: true
}))

// llamada a rutas
app.use('/api/talleres', tallerRouter)
app.use('/api/auth', authRouter)
app.use('/api/fav',favRoutes)
app.use('/api/user',userRouter)


//todo: REVISAR EL PROBLEMA DE CORS

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`)
    })
  })
/*
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
  */

