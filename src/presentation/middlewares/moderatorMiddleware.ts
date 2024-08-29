import { NextFunction, Response } from 'express';
import { IExtendRequest } from './IExtendRequest';
import { ForbiddenException } from '../../application/exceptions/ForbiddenException';
import { UnauthorizedException } from '../../application/exceptions/UnauthorizedException';

const MODERATOR_CHAT_IDS: string[] = [];

export const moderatorMiddleware = (
    req: IExtendRequest,
    res: Response,
    next: NextFunction,
) => {
    const moderatorChatId = req.account?.chatId;
    if (!moderatorChatId) {
        throw new UnauthorizedException('Unauthorized', 'moderatorMiddleware');
    }
    if (!MODERATOR_CHAT_IDS.includes(moderatorChatId)) {
        throw new ForbiddenException('Forbidden', 'moderatorMiddleware', { chatId: moderatorChatId });
    }
    next();
};
