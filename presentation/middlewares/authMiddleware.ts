import CryptoJS from 'crypto-js';
import { NextFunction, Response } from 'express';
import { config } from '@config/config';
import { IExtendRequest } from '@presentation/middlewares/IExtendRequest';
import { UnauthorizedException } from '@app/exceptions/UnauthorizedException';

export const authMiddleware = (
    req: IExtendRequest,
    res: Response,
    next: NextFunction,
) => {
    try {
        const authToken = req.headers.authorization;
        if (!authToken) {
            throw new UnauthorizedException('Нет authToken', 'authMiddleware');
        }

        const initData = new URLSearchParams(authToken);

        const hash = initData.get('hash');
        const user = initData.get('user') ?? '{}';

        let dataToCheck: string[] = [];
        initData.sort();
        initData.forEach((val, key) => {
            key !== 'hash' && dataToCheck.push(`${key}=${val}`);
        });

        const secret = CryptoJS.HmacSHA256(config.bot.bot_token!, 'WebAppData');
        const _hash = CryptoJS.HmacSHA256(
            dataToCheck.join('\n'),
            secret,
        ).toString(CryptoJS.enc.Hex);
        if (_hash !== hash) {
            throw new UnauthorizedException('hash не совпал', 'authMiddleware');
        }

        req.account = {
            chatId: JSON.parse(user).id.toString(),
        };
        console.log(`AUTH - ${req.account.chatId}`);

        next();
    } catch (e) {
        throw new UnauthorizedException(e, 'authMiddleware');
    }
};
