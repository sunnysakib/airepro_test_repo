const { connection } = require("../utils/dbConnect");

// GET
async function getProducts() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM products", (error, results) => {
      if (error) {
        return reject({ message: "Error getting products:", error: error });
      }
      return resolve({ status: "OK", data: results });
    });
  });
} 

// GET Product by id
async function getProductById(productId) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM products WHERE id = ${productId}`,
      (error, results) => {
        if (error) {
          return reject({ message: "Error getting products:", error: error });
        }
        if (results.length === 0) {
          return resolve({ message: `Product id ${productId} not found` });
        }
        return resolve({ status: "OK", results });
      }
    );
  });
}

// POST
async function postProduct(product) {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)";
    connection.query(
      query,
      [product.name, product.description, product.price, product.quantity],
      (error, results) => {
        if (error) {
          return reject({ message: "Error creating product:", error: error });
        }
        return resolve({ status: "created", result: product });
      }
    );
  });
}

// Delete Product by id
async function deleteProduct(productId) {
  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM products WHERE id = ${productId}`,
      (error, results) => {
        if (error) {
          return reject({ message: "Error getting products:", error: error });
        }
        if (results.affectedRows === 0) {
          return resolve({ message: `Product id ${productId} not found` });
        }
        return resolve({ status: "Product deleted successfully" });
      }
    );
  });
}

// Update Product by id
async function updateProduct(productId, product) {
  const { name, description, price, quantity } = product;

  return new Promise((resolve, reject) => {
    const query =
      "UPDATE products SET name=?, description=?, price=?, quantity=? WHERE id=?";
    connection.query(
      query,
      [name, description, price, quantity, productId],
      (error, results) => {
        if (error) {
          return reject({ message: "Error getting products:", error: error });
        }
        if (results.affectedRows === 0) {
          return resolve({ message: `Product id ${productId} not found` });
        }
        return resolve({ status: "Product updated successfully", results });
      }
    );
  });
}

module.exports = {
  postProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};
