import { json } from 'express';
import * as cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from 'libs/common/src/filters/all-exceptions.filter';
import { Reflector } from '@nestjs/core';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';

export class AppBootstrapManager {
  static async getTestingModule(): Promise<TestingModule> {
    return Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  }

  static setAppDefaults(app: INestApplication): INestApplication {
    const reflector = app.get(Reflector);
    app
      .use(json({ limit: '50mb' }))
      .use(cookieParser())
      .setGlobalPrefix('api/v1')
      .useGlobalGuards(new AuthenticatedGuard(reflector))
      .useGlobalFilters(new AllExceptionsFilter())
      .useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          validationError: {
            target: false,
          },
          stopAtFirstError: true,
        }),
      );
    app.enableCors({
      origin: ['http://localhost:3001', 'http://localhost:3000'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
      credentials: false,
    });
    return app;
  }
}
