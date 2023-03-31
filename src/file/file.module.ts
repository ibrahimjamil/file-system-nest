import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './file';
import { FileController } from './file.controller';
import { FileRepository } from './file.repository';
import { FileService } from './file.service';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [FileController],
  providers: [FileService, FileRepository],
})
export class FileModule {}
