import inquirer from 'inquirer';
import { PromptTypes } from './prompt.types';

export class PromptService {
	public async prompt<T>( message: string,type:PromptTypes) {
		const { result } = await inquirer.prompt<{ result: T }>( [ {
			type,
			name: 'result',
			message
		} ] )
		return result
	}
}