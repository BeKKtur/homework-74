import {promises as fs} from 'fs';
import Messages from "./routers/messages";
import {Message, MessageWithoutId} from "./types";
import messages from "./routers/messages";

const filename = './db.json';

let data:Message[] = [];

const fileDb = {
   async init() {
       try {
           const fileContents = await fs.readFile(filename);
           data = JSON.parse(fileContents.toString());
       } catch (e) {
           data = [];
       }
   },

    async getItems() {
       return data.slice(-5);
    },

    async getItemById(date: string) {
      return data.find(message => message.date === date)
    },

    async addItem(item: MessageWithoutId) {
       const message = {
           date: new Date().toJSON(),
           ...item
       }
       data.push(message);
       await this.save();
       return message
    },

    async save() {
        await fs.writeFile(filename, JSON.stringify(data, null, 2));
    }
}

export default fileDb;
