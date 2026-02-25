// /env.js

if(process.env.NODE_ENV !== 'production') require('dotenv').config();

module.exports.DB_URI = process.env.MONGO_DB_URI;
module.exports.SECRET = process.env.SECRET;
