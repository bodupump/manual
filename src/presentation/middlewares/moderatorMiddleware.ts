import { NextFunction, Response } from 'express';
import { IExtendRequest } from '@presentation/middlewares/IExtendRequest';
import { config } from '@config/config';
import { ForbiddenException } from '@app/exceptions/ForbiddenException';
import { UnauthorizedException } from '@app/exceptions/UnauthorizedException';

const MODERATOR_CHAT_IDS = config.moderatorChatIds;

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
