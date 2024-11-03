import dotenv from "dotenv"
dotenv.config({path: './config.env'})

import dbconfig from './config/dbConfig.js';
import app from './app.js';


const port = process.env.PORT || 3000;
console.log(`Port ${process.env.PORT}`)
app.listen(port, ()=> {
    console.log(`listening on port: ${port}`);
})