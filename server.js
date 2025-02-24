import dotenv from "dotenv"
dotenv.config({path: './config.env'})

import dbconfig from './config/dbConfig.js';
import server from './app.js';



const port = process.env.PORT || 3000;
server.listen(port, ()=> {
    console.log(`listening on port: ${port}`);
})