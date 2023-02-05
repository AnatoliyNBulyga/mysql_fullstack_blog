import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@Res() res, @UploadedFile() image): Promise<string> {
    console.log('image ', image);
    const createdFile = await this.fileService.createFile(image);
    console.log(createdFile, 'createdFile');
    return res.status(200).json(createdFile);
  }
}
