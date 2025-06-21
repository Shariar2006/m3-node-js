import mongoose from "mongoose";
import app from "./app";

let server;
const PORT = 3080
async function main() {
    try {
        await mongoose.connect('')
       console.log('connect mongoose')
        server = app.listen(PORT, ()=>{
            console.log(`app successfully listen ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

main()