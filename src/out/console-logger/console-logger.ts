import { IStreamLogger } from './../../core/handlers/stream-logger.interface';


export class ConsoleLogger implements IStreamLogger {

	private static loggerInstance: ConsoleLogger

	public static getInstance(): ConsoleLogger {
		if ( !ConsoleLogger.loggerInstance ) {
			ConsoleLogger.loggerInstance = new ConsoleLogger()
		}
		return ConsoleLogger.loggerInstance
	}

	log( ...args: any[] ): void {
		console.log(...args);
	}

	error( ...args: any[] ): void {
		console.log(...args)
	}

	end(): void {
		console.log('Готово');
	}
}
