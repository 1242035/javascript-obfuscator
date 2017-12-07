import { inject, injectable, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { IInitializable } from '../interfaces/IInitializable';
import { ILogger } from '../interfaces/logger/ILogger';
import { IOptions } from '../interfaces/options/IOptions';

import { LoggingMessage } from '../enums/logger/LoggingMessage';
@injectable()
export class Logger implements ILogger, IInitializable {
    
    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.options = options;
    }

    @postConstruct()
    public initialize (): void {
        
    }

    /**
     * @param {LoggingMessage} loggingMessage
     * @param {string | number} value
     */
    public info (loggingMessage: LoggingMessage, value?: string | number): void {
        this.log(loggingMessage, value);
    }

    /**
     * @param {LoggingMessage} loggingMessage
     * @param {string | number} value
     */
    public success (loggingMessage: LoggingMessage, value?: string | number): void {
        this.log(loggingMessage, value);
    }

    /**
     * @param {LoggingMessage} loggingMessage
     * @param {string | number} value
     */
    public warn (loggingMessage: LoggingMessage, value?: string | number): void {
        this.log(loggingMessage, value);
    }

    /**
     *
     * @param {LoggingMessage} loggingMessage
     * @param {string | number} value
     */
    private log (loggingMessage: LoggingMessage, value?: string | number): void {
        if (!this.options.log) {
            return;
        }

        !value ? console.log(LoggingMessage) : console.log(LoggingMessage, value);
    }
}
