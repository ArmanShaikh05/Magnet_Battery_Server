import express from "express"
import { config } from "dotenv"
import { connectDB } from "./Data/database.js"
import ProductRouter from "./Routes/productRoutes.js"
import cors from "cors"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { ErrorMiddleware } from "./middlewares/error.js"
import { METHODS } from "http"

const server = express()

config({
    path:"./Data/config.env"
})
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connectDB()

// USING MIDDLEWARES
server.use(cors({
        origin:process.env.FRONTEND_URL,
        methods:["GET","POST","PUT","DELETE"],
        credentials:true
    }))

server.use(express.urlencoded({extended:true}))
server.use(express.json())
server.use('/uploads',express.static(__dirname + '/uploads'))
server.use(ErrorMiddleware)



// USING ROUTES
server.use("/api/v1/products",ProductRouter)

// SERVER ROUTES

server.get("/",(req,res,next)=>{
    res.send("<h1>Hello</h1>")
})


server.listen(process.env.PORT,()=>{
    console.log(`Server is running on PORT: ${process.env.PORT}`)
})
