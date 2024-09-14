import { Controller, Get, Render, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Public } from './decorator/customize';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('version')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Version('1') // => api/v1
  @Public()
  @Get() //  => api (restful)
  @Render('home') // => view (html, ejs, ...)
  handleHomePage() {
    // port from .env
    console.log(">> check port = ", this.configService.get<string>('PORT'));  
    const version = "1";
    const message = this.appService.getHelloVersion1(); // gọi đến service để lấy data
    return { message, version }; // truyền data vào view
    // return "this.appService.getHello()";
  }

  @Version('2') // => api/v2
  @Public()
  @Get() //  => api (restful)
  @Render('home') // => view (html, ejs, ...)
  handleHomePage2() {
    // port from .env
    console.log(">> check port = ", this.configService.get<string>('PORT'));  
    const version = "2";
    const message = this.appService.getHelloVersion2(); // gọi đến service để lấy data
    return { message, version }; // truyền data vào view
  }
}
