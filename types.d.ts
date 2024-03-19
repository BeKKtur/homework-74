export interface Message {
    date: string;
    message: string;
}

export type MessageWithoutId = Omit<Message, 'date'>