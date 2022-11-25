"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FfmpegBuilder = void 0;
class FfmpegBuilder {
    constructor() {
        this.options = ['-c:v', 'libx264', '-s'];
    }
    setInputPath(path) {
        this.inputPath = path;
        return this;
    }
    setOutputPath(path) {
        this.outputPath = path;
        return this;
    }
    setVideoResolution(width, height) {
        this.videoResolution = `${width}x${height}`;
        return this;
    }
    build() {
        if (!this.inputPath || !this.outputPath || !this.videoResolution) {
            throw new Error(`You have to define inputPath, outputPath and videoResolution`);
        }
        this.options.unshift('-i', this.inputPath);
        this.options.push(this.videoResolution);
        this.options.push(this.outputPath);
        return this.options.join(' ');
    }
}
exports.FfmpegBuilder = FfmpegBuilder;
const bilda = new FfmpegBuilder()
    .setInputPath('/myLib')
    .setVideoResolution(1920, 1080)
    .setOutputPath('/myOutDir').build();
console.log(bilda);
