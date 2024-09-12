import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';
import { RegisterDto } from './dto/create-user.dto'; 
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
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

  createRefreshToken(payload : any) {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get("JWT_REFRESH_TOKEN_SECRET"),
      expiresIn: this.configService.get("JWT_REFRESH_EXPIRE")
    });
    return refreshToken;
  }

  async login(user: IUser, response: Response) {
    const { _id, email, name, role } = user;
    const payload = { 
      sub: "token login",
      iss: "from server",
      _id,
      email,
      name,
      role
    };

    const refreshToken = this.createRefreshToken(payload);

    // update user with refresh token
    await this.usersService.updateUserToken(user._id, refreshToken);

    // set refresh token as cookie
    response.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: ms(this.configService.get<string>("JWT_REFRESH_EXPIRE"))
    });

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id,
        email,
        name
      }
    };
  }

  async register(regiterDto : RegisterDto) {
    const newUser = await this.usersService.register(regiterDto);
    return {
      _id: newUser?._id,
      create: newUser?.createdAt
    };
  }

  async processNewToken(request: Request, response : Response) {
    try {
      const refreshToken = request.cookies["refresh_token"];
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get("JWT_REFRESH_TOKEN_SECRET")
      });
      const user = await this.usersService.findOneByRefreshToken(refreshToken);
      if (user) {
        const { _id, email, name, role } = user;
        const payload = { 
          sub: "token login",
          iss: "from server",
          _id,
          email,
          name,
          role
        };
    
        const refreshToken = this.createRefreshToken(payload);
    
        // update user with refresh token
        await this.usersService.updateUserToken(user._id.toString(), refreshToken);
    
        // set refresh token as cookie
        response.clearCookie("refresh_token");
        response.cookie("refresh_token", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: ms(this.configService.get<string>("JWT_REFRESH_EXPIRE"))
        });
        return {
          access_token: this.jwtService.sign(payload),
          user: {
            _id,
            email,
            name
          }
        }
      } else {
        throw new BadRequestException("Invalid refresh token");
      }
    }
    catch (error) {
      throw new BadRequestException("Invalid refresh token");
    }
  }

  async logout(user: IUser, response : Response) {
    await this.usersService.updateUserToken(user._id, "");
    response.clearCookie("refresh_token");
    return null;
  }
}
