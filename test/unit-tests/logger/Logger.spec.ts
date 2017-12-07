import 'reflect-metadata';

import { assert } from 'chai';
import * as sinon from 'sinon';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';
import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { ILogger } from '../../../src/interfaces/logger/ILogger';

import { LoggingMessage } from '../../../src/enums/logger/LoggingMessage';

describe('Logger', () => {
    describe('info (loggingMessage: LoggingMessage, value?: string | number): void', () => {
        describe('`log` option is enabled', () => {
            const expectedConsoleLogCallResult: boolean = true;

            let consoleLogSpy: sinon.SinonSpy,
                consoleLogCallResult: boolean,
                inversifyContainerFacade: IInversifyContainerFacade;

            before(() => {
                inversifyContainerFacade = new InversifyContainerFacade();
                inversifyContainerFacade.load('', {
                    log: true
                });

                const logger: ILogger = inversifyContainerFacade.get<ILogger>(ServiceIdentifiers.ILogger);

                consoleLogSpy = sinon.spy(console, 'log');
                logger.info(LoggingMessage.ObfuscationStarted);

                consoleLogCallResult = consoleLogSpy.called;
            
            });

            it('should call `console.log`', () => {
                assert.equal(consoleLogCallResult, expectedConsoleLogCallResult);
            });


            after(() => {
                consoleLogSpy.restore();
                inversifyContainerFacade.unload();
            });
        });

        describe('`log` option is disabled', () => {
            const expectedConsoleLogCallResult: boolean = false;

            let consoleLogSpy: sinon.SinonSpy,
                consoleLogCallResult: boolean,
                inversifyContainerFacade: IInversifyContainerFacade;

            before(() => {
                inversifyContainerFacade = new InversifyContainerFacade();
                inversifyContainerFacade.load('', {
                    log: false
                });

                const logger: ILogger = inversifyContainerFacade.get<ILogger>(ServiceIdentifiers.ILogger);

                consoleLogSpy = sinon.spy(console, 'log');
                logger.info(LoggingMessage.ObfuscationStarted);

                consoleLogCallResult = consoleLogSpy.called;
            });

            it('shouldn\'t call `console.log`', () => {
                assert.equal(consoleLogCallResult, expectedConsoleLogCallResult);
            });

            after(() => {
                consoleLogSpy.restore();
                inversifyContainerFacade.unload();
            });
        });
    });
});
