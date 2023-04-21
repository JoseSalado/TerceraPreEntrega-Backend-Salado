import express from "express";
import mongoose from "mongoose";
import handlebars from 'express-handlebars' 
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from "passport";
import __dirname from './dirname.js'
import router from './router/index.js'
import config from "./config/index.js";
import initializePassport from "./config/passport.config.js";

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.engine("handlebars", handlebars.engine())
app.set('views', __dirname + "/views")
app.set("view engine", "handlebars")

const { user, pass } = config.mongodb;

mongoose.set('strictQuery', false)
app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${user}:${pass}@cluster0.lnyq7c9.mongodb.net/?retryWrites=true&w=majority`,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        //ttl: 15 al borrarlo, las sesiones por defecto duran 15 dias
    }),
    secret: 'asdf1234',
    resave: false,
    saveUninitialized: false
}))

initializePassport();
app.use(passport.initialize())
app.use(passport.session())

const mongooseRun = async() => {
    try {
        await mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.lnyq7c9.mongodb.net/?retryWrites=true&w=majority`)
        console.log('db is connected');
    } catch (error) {
        console.log(`cannot connect to db. Error: ${error}`);
    }
}

mongooseRun()

router(app)

export default app