/**
 * Уровни логов Grafana Loki
 */
export enum ELoggerLevel {
    TRACE = 'trace',
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    CRITICAL = 'critical',
    FATAL = 'fatal',
}

const values: ELoggerLevel[] = Object.values(ELoggerLevel);

/**
 *
 */
export const isELoggerLevel = (arg: any): arg is ELoggerLevel => {
    const _isELoggerLevel = values.includes(arg);
    if (!_isELoggerLevel) {
        console.warn(
            `isELoggerLevel :: Аргумент не является ELoggerLevel: "${arg}"`,
        );
    }
    return _isELoggerLevel;
};
