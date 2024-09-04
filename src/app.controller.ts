import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get() //  => api (restful)
  @Render('home') // => view (html, ejs, ...)
  handleHomePage() {
    // port from .env
    console.log(">> check port = ", this.configService.get<string>('PORT'));  
    const message = this.appService.getHello(); // gọi đến service để lấy data
    return { message }; // truyền data vào view
    // return "this.appService.getHello()";
  }
}
