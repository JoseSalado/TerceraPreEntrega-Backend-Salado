import { Router } from "express";
import UserManager from "../dao/mongo/users.mongo.js";
import passport from "passport";
//import { createHash, isValidPass } from "../utils/cryptPassword.js";

const User = new UserManager();

const router = Router();

/* router.post("/", async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;
    const newUserInfo = {
      name,
      lastname,
      email,
      password: createHash(password),
    };
    const newUser = await User.create(newUserInfo);
    res.status(201).json({ msg: newUser });
  } catch (error) {
    console.log(error);
    if (error.code === 11000)
      return res.status(400).json({ error: `email is in use` });
    res.status(500).json({ error: "internal error" });
  }
}); */

//rutas para passport
router.post(
  "/",
  passport.authenticate(
    "register",
    { failureRedirect: "/failRegister" }),
    async (req, res) => {
      try {
        res.json({ msg: "user has been saved" });
      } catch (error) {
        console.log(error);
        if (error.code === 11000)
          return res.status(400).json({ error: `email is in use` });
        res.status(500).json({ error: "internal error" });
      }
    }
);

router.get("/failRegister", async (req, res) => {
  console.log("registration failed");
  res.status(500).json({ error: "internal error" });
});

export default router;