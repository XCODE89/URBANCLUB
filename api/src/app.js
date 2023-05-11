const express = require("express");
const morgan = require("morgan");
const fileupload = require("express-fileupload")
const cors = require("cors")
const mainRouter = require("./routes/index");
const passport = require("passport");
const session = require('express-session');



const app = express();
app.use(express.json());

app.use(morgan("dev"));
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 
    }
  }));
  //? inicializar el modulo passport
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({origin:"http://localhost:3000", credentials:true}))

// app.use(fileupload({
//     useTempFiles: true,
//     tempFileDir: "./uploads" // crea una carpeta temporal ponemos la que queramos crear
// }))
app.use(mainRouter);

module.exports = app;