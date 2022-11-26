export class FfmpegBuilder {
	private options: string[] = ['-c:v', 'libx264', '-s']
	private inputPath: string
	private outputPath: string
	private videoResolution: string
	
	setInputPath( path:string ):this {
		this.inputPath = path
		return this
	}
	setOutputPath( path: string ):this {
		this.outputPath = path
		return this
	}

	setVideoResolution( width: number, height: number ):this {
		this.videoResolution = `${ width }x${ height }`
		return this
	}
	build():string[] {
		if ( !this.inputPath || !this.outputPath || !this.videoResolution ) {
			throw new Error(`You have to define inputPath, outputPath and videoResolution`)
		}
		this.options.unshift('-i', this.inputPath)
		this.options.push( this.videoResolution )
		this.options.push( this.outputPath )
		return this.options
	}
}

const bilda = new FfmpegBuilder()
	.setInputPath( '/myLib' )
	.setVideoResolution( 1920, 1080 )
	.setOutputPath( '/myOutDir' ).build()
console.log(bilda);