import mongoose from 'mongoose'
import dotenv from "dotenv"
dotenv.config({path: './config.env'})

mongoose.connect(process.env.CONNECTION_STR)
console.log("string", process.env.CONNECTION_STR);


// connection state
const db = mongoose.connection;

db.on('connected', ()=> {
    console.log("Connection established");
});

db.on('error', (err)=> {
    console.log("Error connecting to MongoDB: ", err);
});

export default db;