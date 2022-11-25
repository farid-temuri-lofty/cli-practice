"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
class ConsoleLogger {
    static getInstance() {
        if (!ConsoleLogger.loggerInstance) {
            ConsoleLogger.loggerInstance = new ConsoleLogger();
        }
        return ConsoleLogger.loggerInstance;
    }
    log(...args) {
        console.log(...args);
    }
    error(...args) {
        console.log(...args);
    }
    end() {
        console.log('Готово');
    }
}
exports.ConsoleLogger = ConsoleLogger;
