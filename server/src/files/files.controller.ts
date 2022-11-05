import {Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FilesService } from './files.service';
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('upload')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() image) {
    return this.fileService.createFile(image);
  }
}
