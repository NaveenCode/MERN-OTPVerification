const express = require("express");
require('colors');
const cors = require('cors');
const dotenv = require('dotenv');
const connect = require("./connection/database");
const router = require('./routes/UserRouter')
const app = express();
dotenv.config();
connect()
app.use(cors())
app.use(express.json())
app.use('/api/user', router)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`.yellow)
})