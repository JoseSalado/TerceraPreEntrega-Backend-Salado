import Cart from "./models/carts.models.js";
import ProductManager from "./products.mongo.js";

const Product = new ProductManager();

class CartManager {
  async get() {
    try {
      const carts = await Cart.find();
      return carts;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(cid) {
    try {
      const cart = await Cart.findOne({ _id: cid });
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  async create(product) {
    try {
      const cart = await Cart.create(product);
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  async addProduct(cid, pid) {
    try {
      const product = await Product.getById(pid);
      if (!product) return `it doesn't exist a product with id ${pid}`;
      const cart = await Cart.findById(cid);
      if (!cart) return `it doesn't exist a cart with id ${cid}`;

      const index = cart.products
        .map((elem) => elem.product._id.toString())
        .indexOf(pid);

      if (index === -1) {
        cart.products.push({ product: pid });
      } else {
        cart.products[index].quantity += 1;
      }

      const response = await Cart.updateOne({ _id: cid }, cart);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async insertProducts(cid, productsArray) {
    try {
      const cart = await Cart.findOne({ _id: cid });
      cart.products = productsArray;
      const response = await Cart.updateOne({ _id: cid }, cart);
      return response;
    } catch (error) { 
      console.log(error);
    }
  }

  async updateQuantity(cid, pid, quantity) {
    try {
      let number = Number(quantity);
      const cart = await Cart.findById(cid);
      const index = cart.products
        .map((elem) => elem.product._id.toString())
        .indexOf(pid);
      cart.products[index].quantity = number;
      const response = await Cart.updateOne({ _id: cid }, cart);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductById(cid, pid) {
    try {
      const product = await Product.getById(pid);
      if (!product) return `it doesn't exist a product with id ${pid}`;
      const cart = await Cart.findById(cid);
      if (!cart) return `it doesn't exist a cart with id ${cid}`;

      const index = cart.products
        .map((elem) => elem.product._id.toString())
        .indexOf(pid);

      cart.products.splice(index, 1);

      await Cart.updateOne({ _id: cid }, { $set: { products: cart.products } });
      const updatedCart = await Cart.findById(cid);
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(cid) {
    try {
      if (cid.toString().length !== 24)
        return `product id must have 24 characters`;
      const cart = await Cart.findOne({ _id: cid });
      if (!cart) return `it doesn't exist a cart with id ${cid}`;

      cart.products = [];
      await Cart.updateOne({ _id: cid }, cart);
      const updatedCart = await Cart.findById(cid);
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  }
}

export default CartManager;