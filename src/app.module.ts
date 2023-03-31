import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvHelper, validateAdmin } from 'libs/env/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import jwtConfig from './config/jwt.config';
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
    FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
