const express = require("express");
const { connection } = require("./utils/dbConnect");
const app = express();
const cors = require('cors');
const productsRouter = require("./routes/products/products.routers");
const morgan = require('morgan');
const salesRouter = require("./routes/sales/sales.routers");

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use('/products', productsRouter);
app.use('/sales', salesRouter);


// root route
app.get('/', (req, res) => {
    res.send("Airepro Test");
})


module.exports = app;