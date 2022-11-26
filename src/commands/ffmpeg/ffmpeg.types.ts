import { ICommandExec } from './../../core/executor/command.types';
export interface IFfmpegExecutorUserInput {
	filePath: string,
	videoWidth: number,
	videoHeight: number,
	name: string
}

export interface ICommandExecFfmpeg extends ICommandExec {
	outputPath: string
}