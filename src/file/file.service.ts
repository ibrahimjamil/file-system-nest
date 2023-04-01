import { Injectable } from '@nestjs/common';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository){}

  getFile(): string {
    return 'Hello File!';
  }

  postFile(name: string, email: string){
    return this.fileRepository.postFile(name, email)
  }
}
