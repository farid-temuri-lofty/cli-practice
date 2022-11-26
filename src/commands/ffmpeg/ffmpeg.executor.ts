import { FileService } from './../../core/files/file.service';
import { IFfmpegExecutorUserInput, ICommandExecFfmpeg } from './ffmpeg.types';
import { IStreamLogger } from '../../core/handlers/stream-logger.interface';
import { StreamHandler } from '../../core/handlers/stream.handler';
import { FfmpegBuilder } from './ffmpeg.builder';
import { PromptService } from '../../core/prompt/prompt.service';
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecutor } from "../../core/executor/command.executor";
import { ICommandExec } from "../../core/executor/command.types";

export default class FfmpegExecutor extends CommandExecutor<IFfmpegExecutorUserInput>{
	private fileService: FileService = new FileService()
	private promptService: PromptService = new PromptService()
	constructor (logger:IStreamLogger) {
		super(logger)
	}
	protected async prompt(): Promise<IFfmpegExecutorUserInput> {
		const res:IFfmpegExecutorUserInput = {
			filePath: await this.promptService.prompt( 'Path to file', 'input' ),
			videoWidth:await  this.promptService.prompt( 'Video width', 'number' ),
			videoHeight:await  this.promptService.prompt( 'Video height', 'number' ),
			name: await this.promptService.prompt( 'Output file name','input' ),
		}
		return res
	}
	protected build( {
		filePath, videoHeight, videoWidth, name }: IFfmpegExecutorUserInput
	): ICommandExec {
		const outputPath = this.fileService.getFilePath( { path: filePath, name, extension: 'mp4'})
		const commands: ICommandExecFfmpeg = {
			command: 'ffmpeg',
			args: new FfmpegBuilder()
				.setInputPath( filePath )
				.setOutputPath( outputPath )
				.setVideoResolution( videoWidth, videoHeight )
				.build(),
			outputPath
		}
		return commands
	}
	protected spawnCommand( {outputPath,args,command}: ICommandExecFfmpeg ): ChildProcessWithoutNullStreams {
		this.fileService.deleteFileIfExist(outputPath)
		return spawn(command,args)
	}
	protected processStream( stream: ChildProcessWithoutNullStreams, logger: IStreamLogger ): void {
		const hendler = new StreamHandler( logger )
		hendler.processOutput( stream )
	}

}