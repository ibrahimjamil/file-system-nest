import { DataSource } from 'typeorm';
import path = require('path');
import * as dotenv from 'dotenv';
import { EnvHelper } from '../../../env/src/env.helper';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config({ path: EnvHelper.getEnvFilePath() });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [
    path.join(__dirname, '../../../../apps/**/*.entity{.ts,.js}'),
    path.join(__dirname, '../../../../libs/**/*.entity{.ts,.js}'),
  ],
  subscribers: [
    path.join(__dirname, '../../../../apps/**/*.subscriber{.ts,.js}'),
    path.join(__dirname, '../../../../libs/**/*.subscriber{.ts,.js}'),
  ],
  synchronize: false,
  logging: process.env.TYPEORM_LOGGING === 'true',
  migrations: [path.join(__dirname, '../../../../libs/database/src/migrations/*')],
  extra: {
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT || 200,
    waitForConnections: process.env.MYSQL_WAIT_FOR_CONNECTIONS === 'true',
  },
  namingStrategy: new SnakeNamingStrategy(),
  ssl: false,
});
