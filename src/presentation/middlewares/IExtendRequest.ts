import { Request } from 'express';

export interface IExtendRequest extends Request {
    account?: {
        chatId?: string
    }
}