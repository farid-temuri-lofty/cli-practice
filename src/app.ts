import { PromptService } from './core/prompt/prompt.service';
export class App {
	async run() {
		const data = await new PromptService().prompt<number>( 'How many times did you lied?', 'number' )
		console.log(data);
	}
}

const app = new App() 
app.run()