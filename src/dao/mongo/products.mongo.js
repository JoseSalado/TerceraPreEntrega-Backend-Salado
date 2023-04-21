import Product from "./models/products.models.js";
import FilesManager from "../memory/files.memory.js";

class ProductManager {
  async get(limit = 5, page = 1, query, sort) {
    try {
      const myCustomLabels = {
        limit: false,
        totalDocs: false,
        pagingCounter:  false
      };  
      let queryModel;
      !query ? (queryModel = {}) : (queryModel = { category: query });
        
      const pageOptions = {
        page,
        limit,
        sort: { price: sort   },  
        customLabels: myCustomLabels,
      };

      const products = await Product.paginate(
        queryModel,
        pageOptions,  
        function (err, result) {
          return result;  
        }
      );
      products.nextPage = `http://localhost:${process.env.port}/products?page=${products.nextPage}&limit=${limit}`
      products.prevPage = `http://localhost:${process.env.port}/products?page=${products.prevPage}&limit=${limit}`
      return products;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(pid) {
    try {
      const product = await Product.findById(pid);
      return product;
    } catch (error) {
      console.log(error);
    }
  }
  async save(product) {
    try {
      await Product.create(product);
      return `product have been saved`;
    } catch (error) {
      console.log(error);
    }
  }
  async update(pid, product) {
    try {
      const filter = { _id: pid };
      await Product.findByIdAndUpdate(filter, product);
      return `product has been updated`;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(pid) {
    try {
      await Product.findByIdAndDelete(pid);
      return `product has been deleted`;
    } catch (error) {
      console.log(error);
    }
  }

  async populate() {
    try {
      const productsManager = new FilesManager("products.json");
      const products = await productsManager.loadItems();
      await Product.insertMany(products);
      return `products have been uploaded`;
    } catch (error) {
      console.log(error);
    }
  }
  async despopulate() {
    try {
      await Product.deleteMany();
      return `products have been deleted`;
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProductManager;