import { compare, hash, genSaltSync } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService){}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.getUser(email);
        if (user && (await compare(password, user.password))) {
          const { password, ...result } = user;
          return result;
        }
        return null;
    }

    async signIn(email: string, password: string) {
        var salt = genSaltSync(10);
        /** Encrypt password */
        hash(password, salt, async (err, res) => {
            const storeUser = await this.userService.createUser(email, res)
            return storeUser;
        });
    }
    
    async login(user: any){
        const accessToken = await this.createAccessToken(user);
        return {
          accessToken,
        };
    }

    private async createAccessToken(user: any): Promise<string> {
        const payload = {
          name: user.name,
          email: user.email,
          uuid: user.uuid,
        };
    
        return this.jwtService.signAsync(payload);
    }
}
