import { registerAs } from '@nestjs/config';
import path = require('path');

export default registerAs('databaseConfig', () => ({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT || 3306,
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
  migrationsTableName: 'migrations',
  migrations: [path.join(__dirname, '../migrations/*{.ts,.js')],
  cli: {
    entitiesDir: 'src/**/',
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
  },
  legacySpatialSupport: false,
}));
