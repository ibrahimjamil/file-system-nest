import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository){}

  getUser(email: string) {
    return this.userRepository.findOneUser(email);
  }

  createUser(email: string, password: string){
    return this.userRepository.postUser(email, password)
  }
}
