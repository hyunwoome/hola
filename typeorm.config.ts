import { config } from 'dotenv';
import * as process from 'process';
import { DataSource } from 'typeorm';

config();

export const typeORMConfig = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  migrations: ['./src/migration/*.ts'],
  migrationsTableName: 'migrations',
});
