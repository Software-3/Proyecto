require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require("./routes/productRoutes");

connectDB();

const app = express();

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

process.on("unhandleRejections",(err, promise) =>{
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
})