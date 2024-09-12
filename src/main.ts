import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  
  // truyền metadata vào lobal guard
  const reflector = app.get('Reflector');
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  // config cookie parser
  app.use(cookieParser());
  // config cors
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });
  // config versioning
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1','2']
  });
  app.useStaticAssets(join(__dirname, '..', 'public')); // js, css, img, ...
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // views
  app.setViewEngine('ejs');
  await app.listen(configService.get<string>('PORT'), () => {
    console.log(`Server is running at http://localhost:${configService.get<string>('PORT')}`);
  });
}
bootstrap();
