import { IStreamLogger } from './../handlers/stream-logger.interface';
import { ICommandExec } from './command.types';
import { ChildProcessWithoutNullStreams } from 'child_process';

abstract class CommandExecutor<UserInput> {
	constructor (
		private logger:IStreamLogger
	) {}
	protected abstract prompt():Promise<UserInput>
	protected abstract build(data:UserInput):ICommandExec
	protected abstract spawnCommand(command:ICommandExec):ChildProcessWithoutNullStreams
	protected abstract processStream(stream:ChildProcessWithoutNullStreams, logger: IStreamLogger):void
	public async execute() {
		const input = await this.prompt()
		const command = this.build( input )
		const stream = this.spawnCommand( command )
		this.processStream(stream, this.logger)
	}
}