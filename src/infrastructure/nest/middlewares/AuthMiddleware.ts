import { NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { authMiddleware } from '../../../presentation/middlewares/authMiddleware';
import { IExtendRequest } from '../../../presentation/middlewares/IExtendRequest';

export class AuthMiddleware implements NestMiddleware {
    use(req: IExtendRequest, res: Response, next: NextFunction) {
        authMiddleware(req, res, next);
    }
}
