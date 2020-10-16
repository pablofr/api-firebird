'use strict';
require('dotenv/config');
exports.options = {
    host: process.env.HOST,
    port: process.env.PORTFB,
    database: process.env.DATABASE, //"C:/TGA/Dados/TGA.FDB",
    user: process.env.USER,
    password: process.env.PASS,
    lowercase_keys: false, // set to true to lowercase keys
    role: null,            // default
    pageSize: 4096         // default when creating database
};
// exports.options = {
//     host: '127.0.0.1',
//     port: 3050,
//     database: 'C:/TGA/Dados/TGA.FDB', //"C:/TGA/Dados/TGA.FDB",
//     user: 'SYSDBA',
//     password: 'masterkey',
//     lowercase_keys: false, // set to true to lowercase keys
//     role: null,            // default
//     pageSize: 4096         // default when creating database
// };

// // alternatively, get results using foreach
// result.forEach(function(row){
//     console.log( row.CODPRD, String.fromCharCode.apply(null, new Uint16Array(row.NOMEFANTASIA)));
// });

 exports.convertBuffer = (buf) => {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
 }