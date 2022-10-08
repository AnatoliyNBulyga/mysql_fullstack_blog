import mysql from 'mysql';

export const db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "fullstack_blog",
});