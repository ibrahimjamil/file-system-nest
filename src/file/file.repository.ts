import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { File } from './file.entity';

@Injectable()
export class FileRepository extends Repository<File> {
  constructor(public readonly dataSource: DataSource) {
    super(File, dataSource.manager);
  }

  async findById(id: number) {
    return this.findOne({ where: { id } });
  }
}
