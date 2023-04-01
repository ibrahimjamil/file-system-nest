import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository){}

  getUser(name: string) {
    return this.userRepository.findOneUser(name);
  }

  createUser(name: string, password: string){
    return this.userRepository.postUser(name, password)
  }
}
