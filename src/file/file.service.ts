import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  getFile(): string {
    return 'Hello File!';
  }

  postFile(){
    return 'File is in process'
  }
}
