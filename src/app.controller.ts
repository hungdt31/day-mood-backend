import { Post, Request, UseGuards, Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './decorator/customize';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {}

  // @Get() //  => api (restful)
  // @Render('home') // => view (html, ejs, ...)
  // handleHomePage() {
  //   // port from .env
  //   console.log(">> check port = ", this.configService.get<string>('PORT'));  
  //   const message = this.appService.getHello(); // gọi đến service để lấy data
  //   return { message }; // truyền data vào view
  //   // return "this.appService.getHello()";
  // }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
