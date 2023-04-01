import { Body, Controller } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}


    public storeUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto.email, createUserDto.password);
    }

    public getUser(name: string){
        return this.userService.getUser(name);
    }
}
