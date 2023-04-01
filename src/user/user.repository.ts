import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(public readonly dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  async findOneUser(name: string) {
    return this.findOneBy({name});
  }
  async postUser(name: string, password: string) {
    await this
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
        name,
        password
    })
    .execute()
  }
}
