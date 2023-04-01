import { compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService,){}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.getUser(email);
        if (user && (await compare(password, user.password))) {
          const { password, ...result } = user;
          return result;
        }
        return null;
    }
    
    async login(user: User) {
        const payload = { email: user.name, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
