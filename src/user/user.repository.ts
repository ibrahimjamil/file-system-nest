import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(public readonly dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  async findOneUser(email: string) {
    return this.findOneBy({email});
  }
  async postUser(email: string, password: string) {
    await this
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
        email,
        password
    })
    .execute()
  }
}
