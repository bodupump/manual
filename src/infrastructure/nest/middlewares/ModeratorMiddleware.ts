import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { IExtendRequest } from '@presentation/middlewares/IExtendRequest';
import { moderatorMiddleware } from '@presentation/middlewares/moderatorMiddleware';

export class ModeratorMiddleware implements NestMiddleware {
    use(req: IExtendRequest, res: Response, next: NextFunction) {
        moderatorMiddleware(req,res,next);
    }
}
