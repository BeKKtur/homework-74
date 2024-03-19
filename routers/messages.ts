import express from "express";
import {Message, MessageWithoutId} from "../types";
import fileDb from "../fileDb";

const messagesRouter = express.Router();
const messages: Message[] = [];
const date = new Date().toString();

messagesRouter.get('/', async (req,res ) => {
    const messages = await fileDb.getItems()
    return res.send(messages);
});

messagesRouter.get('/:date', async (req, res) => {
    const date = req.params.date;
    const message = await fileDb.getItemById(date);

    if (!message){
        return res.status(404).json({error:'Not found'});
    }

    return res.send(message);
});

messagesRouter.post('/', async (req, res) => {
    const messageData:MessageWithoutId = {
        message: req.body.message
    };

    const message = await fileDb.addItem(messageData);

    return res.send(message);
});

export default messagesRouter
