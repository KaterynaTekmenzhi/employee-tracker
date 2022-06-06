require('dotenv').config();
const mysql = require('mysql2');


const PORT = process.env.PORT || 3000;


const connection = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
    console.log(`Connected to Database on ${process.env.DB_HOST, PORT}`)
);

module.exports = connection;