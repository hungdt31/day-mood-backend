import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // username and password are passed from the login method
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    if (user) {
      const isValid = this.usersService.isValidPasword(pass, user.password);
      if (isValid) return user;
    }
    return null;
  }

  async login(user: IUser) {
    const { _id, email, name, role } = user;
    const payload = { 
      sub: "token login",
      iss: "from server",
      _id,
      email,
      name,
      role
    };
    return {
      access_token: this.jwtService.sign(payload),
      _id,
      email,
      name,
      role
    };
  }
}
