import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { unlink } from 'node:fs/promises';

@Injectable()
export class FilesService {
  public async createFile(file): Promise<string> {
    try {
      const ext = file.originalname.split('.').pop();
      const fileName = uuid.v4() + `.${ext}`;
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        'An error with file record was occured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async deleteOldFile(fileName: string) {
    try {
      const filePath = path.resolve(__dirname, '..', 'static', fileName);
      if (!fs.existsSync(filePath)) {
        console.log('Wrong file path');
        return false;
      }
      await unlink(filePath);
      console.log(`successfully deleted ${filePath}`);
    } catch (e) {
      throw new HttpException(
        'An error with removing old file was occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
