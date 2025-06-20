import app from "./app";
import { client } from "./config/mongoDB";

let server;
const port = 3080

const bootstrap = async () =>{
  await client.connect();
  console.log('connection database successfully')
    app.listen(port, () => {
        console.log(`Example app listening on ${port}`);
    });
}

bootstrap()