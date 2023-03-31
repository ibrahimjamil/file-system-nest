import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'libs/database/src';
import { EnvHelper, validateAdmin } from 'libs/env/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from '../libs/common/src/configs/app.config';
import jwtConfig from '../libs/common/src/configs/jwt.config';
import { FileModule } from './file/file.module';

EnvHelper.verifyNodeEnv();
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: EnvHelper.getEnvFilePath(),
      isGlobal: true,
      load: [appConfig, jwtConfig],
      validate: validateAdmin,
    }),
    FileModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
