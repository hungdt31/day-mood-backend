import { Post, UseGuards, Controller, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { IUser } from 'src/users/users.interface';
import { RegisterDto } from './dto/create-user.dto';
import { UniqueGmail } from './gmail.guard';
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@User() user : IUser) {
    return this.authService.login(user);
  }

  @Get('profile')
  getProfile(@User() user : IUser) {
    return user;
  }

  @Public()
  @UseGuards(UniqueGmail)
  @Post('register')
  @ResponseMessage("Register success")
  register(@Body() regiterDto : RegisterDto) {
    return this.authService.register(regiterDto);
  }
}
