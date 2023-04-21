import { Router } from "express";
import { publicAccess, privateAccess } from "../middlewares/index.js";
import ProductManager from "../dao/mongo/products.mongo.js";
const Product = new ProductManager();

const router = Router();

router.get("/profile", privateAccess, (req, res) => {
  const { user } = req.session;
  res.render("profile", { user });
});

router.get("/login", publicAccess, (req, res) => {
  res.render("login");
});

router.get("/signup", publicAccess, (req, res) => {
  res.render("signup");
});

router.get("/forgotPass", (req, res) => {
  res.render("forgotPass"); 
});

router.get("/products", privateAccess, async (req, res) => {
  try {
    const { limit, page, query, sort } = req.query;
    const { user } = req.session;
    const products = await Product.get(limit, page, query, sort);
    const docs = []
    products.docs.forEach(element => {
      const {title, description, price} = element
      docs.push({title, description, price})
    });
    res.render("products", { user, products, docs});
  } catch (error) {
    console.log(error);
    res.render('products', {error})
  }
});

export default router;