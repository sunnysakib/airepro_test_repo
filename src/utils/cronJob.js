const cron = require("node-cron");
const { updateProduct } = require("../models/products.model");
const { connection } = require("./dbConnect");

async function cronJob() {
  const getDummyData = async () => {
    return [
      { productId: 1, quantitySold: 10 },
      { productId: 15, quantitySold: 1 },
      { productId: 13, quantitySold: 8 },
      { productId: 2, quantitySold: 1 },
    ];
  };

  console.log("cron job is running");
  cron.schedule("0 * * * *", async () => {
    try {
      const data = await getDummyData();

      const query =
        "INSERT INTO sales (product_id, quantity_sold, sale_date) VALUES (?, ?, NOW())";
      data.forEach(async (item) => {
        const { productId, quantitySold } = item;

        // Check Validation and update product quantity
        connection.query(
          `SELECT * FROM products WHERE id = ${productId}`,
          async (error, results) => {
            if (error) {
              return console.log({
                message: "Error getting products:",
                error: error,
              });
            } 

            if (results.length === 0) {
              return console.log({
                message: `Product id ${productId} not found`,
              });
            } else if (results[0].quantity === 0) {
              console.log(`${results[0].name} is Sold Out`);
            } else if (results[0].quantity < quantitySold) {
              console.log(
                "Quantity sold cannot be greater than quantity in stock"
              );
            } else {
              const UpdatedProduct = {
                name: results[0].name,
                description: results[0].description,
                price: results[0].price,
                quantity: results[0].quantity - quantitySold,
              };

              await updateProduct(productId, UpdatedProduct);
              console.log("product updated");
            }
          }
        );

        connection.query(query, [productId, quantitySold]);
      });
      console.log("Data fetched and processed successfully.");
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  });
}

module.exports = { cronJob };
