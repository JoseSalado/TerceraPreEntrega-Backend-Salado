import passport from "passport";
import local from "passport-local";
import githubStrategy from "passport-github2";
import UserManager from "../dao/mongo/users.mongo.js";
import { createHash, isValidPass } from "../utils/cryptPassword.js";
import config from "./index.js";

const User = new UserManager();

const LocalStrategy = local.Strategy;

const {clientID, clientSecret, callbackURL} = config.passportGithub

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { name, lastname, email } = req.body;

        try {
          const user = await User.findOne({ email: username });
          if (user) {
            console.log("user exists");
            return done(null, false);
          }
          const newUserInfo = {
            name,
            lastname,
            email,
            password: createHash(password),
          };
          const newUser = await User.create(newUserInfo);
          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ email: username });
          if (!user) {
            console.log(`user doesn't exist`);
            return done(null, false);
          }
          if (!isValidPass(user, password)) return done(null, false);
          return done(null, user);
        } catch (error) {
          console.log(error);
        }
      }
    )
  );
  
  passport.use( 
    "github",
    new githubStrategy(
      {
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: callbackURL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {   
          const user = await User.findOne({ email: profile._json.email });
          if (!user) {
            const newUserInfo = {
              name: profile._json.name,
              lastname: " ",
              email: profile._json.email,
              password: "",
            };
            const newUser = await User.create(newUserInfo);
            return done(null, newUser);
          }
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

export default initializePassport;