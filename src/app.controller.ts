import { Controller, Get, Render, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Public } from './decorator/customize';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Version('1') // => api/v1
  @Public()
  @Get() //  => api (restful)
  @Render('home1') // => view (html, ejs, ...)
  handleHomePage() {
    // port from .env
    console.log(">> check port = ", this.configService.get<string>('PORT'));  
    const message = this.appService.getHello(); // gọi đến service để lấy data
    return { message }; // truyền data vào view
    // return "this.appService.getHello()";
  }

  @Version('2') // => api/v2
  @Public()
  @Get() //  => api (restful)
  @Render('home2') // => view (html, ejs, ...)
  handleHomePage2() {
    // port from .env
    console.log(">> check port = ", this.configService.get<string>('PORT'));  
    const message = "This version will be developed in the future.";
    return { message }; // truyền data vào view
  }
}
