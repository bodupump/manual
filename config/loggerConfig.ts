import * as dotenv from 'dotenv';
import {
    ELoggerLevel,
    isELoggerLevel,
} from '../application/interfaces/logger/ELoggerLevel';

dotenv.config();

type TLoggerConfig = {
    name: string;
    level: ELoggerLevel;
    isPrettify: boolean;
};

export const loggerConfig: TLoggerConfig = {
    name: process.env.LOGGER_NAME ?? 'manual',
    level:
        toELoggerLevelOrUndefined(process.env.LOGGER_LEVEL) ??
        ELoggerLevel.ERROR,
    isPrettify: Boolean(Number(process.env.LOGGER_PRETTIFY)),
};
console.log('loggerConfig', loggerConfig);

export function toELoggerLevelOrUndefined(
    arg: unknown,
): ELoggerLevel | undefined {
    return arg && isELoggerLevel(arg) ? arg : undefined;
}
