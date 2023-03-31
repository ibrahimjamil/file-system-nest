import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV,
  TYPEORM_HOST: process.env.TYPEORM_HOST
}));
