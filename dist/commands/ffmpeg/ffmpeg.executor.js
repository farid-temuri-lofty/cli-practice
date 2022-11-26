"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_service_1 = require("./../../core/files/file.service");
const stream_handler_1 = require("../../core/handlers/stream.handler");
const ffmpeg_builder_1 = require("./ffmpeg.builder");
const prompt_service_1 = require("../../core/prompt/prompt.service");
const child_process_1 = require("child_process");
const command_executor_1 = require("../../core/executor/command.executor");
class FfmpegExecutor extends command_executor_1.CommandExecutor {
    constructor(logger) {
        super(logger);
        this.fileService = new file_service_1.FileService();
        this.promptService = new prompt_service_1.PromptService();
    }
    prompt() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = {
                filePath: yield this.promptService.prompt('Path to file', 'input'),
                videoWidth: yield this.promptService.prompt('width', 'number'),
                videoHeight: yield this.promptService.prompt('height', 'number'),
                name: yield this.promptService.prompt('filename', 'input'),
            };
            return res;
        });
    }
    build({ filePath, videoHeight, videoWidth, name }) {
        const outputPath = this.fileService.getFilePath({ path: filePath, name, extension: 'mp4' });
        const commands = {
            command: 'ffmpeg',
            args: new ffmpeg_builder_1.FfmpegBuilder()
                .setInputPath(filePath)
                .setOutputPath(outputPath)
                .setVideoResolution(videoWidth, videoHeight)
                .build(),
            outputPath
        };
        return commands;
    }
    spawnCommand({ outputPath, args, command }) {
        this.fileService.deleteFileIfExist(outputPath);
        return (0, child_process_1.spawn)(command, args);
    }
    processStream(stream, logger) {
        const hendler = new stream_handler_1.StreamHandler(logger);
        hendler.processOutput(stream);
    }
}
exports.default = FfmpegExecutor;
