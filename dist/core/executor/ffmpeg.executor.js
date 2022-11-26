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
const stream_handler_1 = require("./../handlers/stream.handler");
const ffmpeg_builder_1 = require("./../../commands/ffmpeg/ffmpeg.builder");
const prompt_service_1 = require("./../prompt/prompt.service");
const child_process_1 = require("child_process");
const command_executor_1 = require("./command.executor");
class FfmpegExecutor extends command_executor_1.CommandExecutor {
    prompt() {
        return __awaiter(this, void 0, void 0, function* () {
            const promptService = new prompt_service_1.PromptService();
            const res = {
                filePath: yield promptService.prompt('File to process', 'input'),
                videoWidth: yield promptService.prompt('File to process', 'number'),
                videoHeight: yield promptService.prompt('File to process', 'number'),
                outputPath: yield promptService.prompt('File to process', 'input'),
            };
            return res;
        });
    }
    build({ filePath, videoHeight, videoWidth, outputPath }) {
        const commands = {
            command: 'ffmpeg',
            args: new ffmpeg_builder_1.FfmpegBuilder()
                .setInputPath(filePath)
                .setOutputPath(outputPath)
                .setVideoResolution(videoWidth, videoHeight)
                .build()
        };
        return commands;
    }
    spawnCommand(command) {
        return (0, child_process_1.spawn)(command.command, command.args);
    }
    processStream(stream, logger) {
        new stream_handler_1.StreamHandler(logger).processOutput(stream);
    }
}
exports.default = FfmpegExecutor;
