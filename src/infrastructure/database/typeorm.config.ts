import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: isProduction ? process.env.DATABASE_URL : undefined,
  host: isProduction ? undefined : process.env.HOST_DB,
  port: isProduction ? undefined : 5432,
  username: isProduction ? undefined : process.env.USER_DB,
  password: isProduction ? undefined : process.env.PASS_DB,
  database: isProduction ? undefined : process.env.SCHEMA_DB,
  entities: [isProduction ? 'dist/**/*.entity.js' : __dirname + '/../../**/*.entity.{ts,js}'],
  synchronize: false,
  logging: true,
  ssl: isProduction ? { rejectUnauthorized: false } : false, // necessário para Render/Postgres
};
