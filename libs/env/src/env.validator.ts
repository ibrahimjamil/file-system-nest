import { InternalServerErrorException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsIn,
  IsInt,
  IsString,
  Min,
  MinLength,
  validateSync,
} from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Local = 'local',
}

export class EnvironmentVariables {
  @IsEnum(Environment, { groups: ['api', 'producer', 'consumer', 'web', 'admin'] })
  NODE_ENV: Environment;

  @IsString({ groups: ['database', 'producer', 'consumer', 'web', 'admin'] })
  @MinLength(1, { groups: ['database', 'producer', 'consumer', 'web', 'admin'] })
  TYPEORM_HOST: string;

  @IsInt({ groups: ['database', 'producer', 'consumer', 'web', 'admin'] })
  @Min(1, { groups: ['database', 'producer', 'consumer', 'web', 'admin'] })
  TYPEORM_PORT: number;

  @IsString({ groups: ['database', 'producer', 'consumer', 'web', 'admin'] })
  @MinLength(1, { groups: ['database', 'producer', 'consumer', 'web', 'admin'] })
  TYPEORM_PASSWORD: string;

  @IsString({ groups: ['database', 'producer', 'consumer', 'web', 'admin'] })
  @MinLength(1, { groups: ['database', 'producer', 'consumer', 'web', 'admin'] })
  TYPEORM_DATABASE: string;

  @IsString({ groups: ['database', 'producer', 'consumer', 'web', 'admin'] })
  @MinLength(1, { groups: ['database', 'producer', 'consumer', 'web', 'admin'] })
  TYPEORM_USERNAME: string;

  @IsString({ groups: ['database', 'producer', 'consumer', 'web', 'admin'] })
  @MinLength(1, { groups: ['database', 'producer', 'consumer', 'web', 'admin'] })
  TYPEORM_CONNECTION: string;

  @IsString({ groups: ['database', 'producer', 'consumer', 'web', 'admin'] })
  @MinLength(1, { groups: ['database', 'producer', 'consumer', 'web', 'admin'] })
  TYPEORM_MIGRATIONS: string;

  @IsString({ groups: ['database', 'producer', 'consumer', 'web', 'admin'] })
  @MinLength(1, { groups: ['database', 'producer', 'consumer', 'web', 'admin'] })
  TYPEORM_MIGRATIONS_DIR: string;

  @IsString({ groups: ['database', 'producer', 'consumer', 'web', 'admin'] })
  @MinLength(1, { groups: ['database', 'producer', 'consumer', 'web', 'admin'] })
  TYPEORM_LOGGING: string;

  @IsInt({ groups: ['database', 'producer', 'consumer', 'web', 'admin'] })
  @Min(10, { groups: ['database', 'producer', 'consumer', 'web', 'admin'] })
  TYPEORM_POOL_SIZE: number;

  @IsIn(['true', 'false'], { groups: ['database', 'producer', 'consumer', 'web', 'admin'] })
  MYSQL_TLS: 'true' | 'false';
}
export function validateAdmin(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false, groups: ['admin'] });

  if (errors.length > 0) {
    throw new InternalServerErrorException(errors.toString());
  }

  return validatedConfig;
}