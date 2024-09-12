import { Post, UseGuards, Controller, Get, Body, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { IUser } from 'src/users/users.interface';
import { RegisterDto } from './dto/create-user.dto';
import { UniqueGmail } from './gmail.guard';
import { Request, Response } from 'express';

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage("Login success")
  @Post('login')
  handleLogin(
    @User() user : IUser,
    @Res({ passthrough: true }) response : Response
  ) {
    return this.authService.login(user, response);
  }

  @Get('account')
  @ResponseMessage("Get profile success")
  getProfile(@User() user : IUser) {
    return user;
  }

  @Public()
  @UseGuards(UniqueGmail)
  @Post('register')
  @ResponseMessage("Register success")
  handleRegister(@Body() regiterDto : RegisterDto) {
    return this.authService.register(regiterDto);
  }

  @Public()
  @Get('refresh')
  @ResponseMessage("Get profile by refresh token")
  hanldeRefreshToken(
    @Req() request : Request,
    @Res({ passthrough: true }) response : Response
  ) {
    return this.authService.processNewToken(request, response)
  }

  @Get('logout')
  @ResponseMessage("Log out success")
  handleLogout(
    @User() user : IUser,
    @Res({ passthrough: true }) response : Response
  ) {
    return this.authService.logout(user, response)
  }
}
