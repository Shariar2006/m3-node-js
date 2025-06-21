import mongoose from "mongoose";
import app from "./app";
import { mongooseURI } from "./mongooseURI";

let server;
const PORT = 3080
async function main() {
    try {
        await mongoose.connect(mongooseURI)
       console.log('connect mongoose')
        server = app.listen(PORT, ()=>{
            console.log(`app successfully listen ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main()