import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateFileDto } from './file.dto';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('/')
  getFile(): string {
    return this.fileService.getFile();
  }

  @Post('/')
  postFile(@Body() createFileDto: CreateFileDto) {
    return this.fileService.postFile();
  }
}
