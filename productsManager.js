const fs = require("fs").promises;
const { error } = require("console");
const path = require("path");
const { json } = require("react-router-dom");
const filePath = path.join(__dirname + "/products.json");
const { v4: uuidv4 } = require('uuid');

class productManager {
    constructor(){
     this.products=[];
}
async addProduct(obj) {
    //from app to app
    await this.loadProducts;
    const product = { ...obj, id: uuidv4() };
    this.products.push(product);
    this.postproducts();
  }
    
async loadProducts() {
        //from file to app
        try {
          const data = await fs.readFile(filePath);
          this.products = JSON.parse(data);
          return this.products;
        } catch (error) {
          console.warn(error);
        }
      }
async postproducts() {
        //from app to file
        try {
          const jsonProducts = JSON.stringify(this.products);
          await fs.writeFile(filePath, jsonProducts);
        } catch (error) {
          console.warn(error);
        }
      }
      async getProductById(Id) {
          await this.loadProducts();
        const index = this.products.findIndex(
          (product) => product.id.toString() === Id.toString()
        );
        if (index !== -1) {
          const target = this.products[index];
          return target;
        } else throw new Error("product not found");
      }
      async deleteProduct(id) {
         await this.loadProducts();
        const index = this.products.findIndex(
            (product) => product.id.toString() === id.toString()
        );
        if (index !== -1) {
          this.products.splice(index, 1);
          await this.postproducts();
          return "deleted successfully";
        } else throw new Error("product not found");
      }
      async updateProduct(id, newObj) {
         await this.loadProducts();
        const index = this.products.findIndex((student) => student.id.toString() === id.toString());
        if (index !== -1) {
          const newProduct = {
            ...this.products[index],...newObj
          };
          this.products[index] = newProduct
          await this.postproducts();
          return newProduct;
        } else throw new Error("product not found");
      }
      async getProductsInRange(start, limit) {
        // validate that start and limit are actually numbers
        if (!(typeof start == "number" && typeof limit == "number"))
          return "inputs are not valid numbers";
         await this.loadProducts();
        const filtered = this.products.filter(
            (product) => product.price <= limit && product.price >= start
    );
    if (filtered.length) return filtered;
    else return "no products within range";
  }
    }
    module.exports =  productManager ;
