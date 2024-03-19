import express from 'express';
import messagesRouter from "./routers/messages";
import Messages from "./routers/messages";
import {Message} from "./types";
import fileDb from "./fileDb";

const app = express();
const port = 8000;


app.use(express.json());
app.use('/messages', messagesRouter);


const run = async () => {
await fileDb.init()

app.listen(port, () => {
    console.log(`server ${port}`)
});
};

void run()

