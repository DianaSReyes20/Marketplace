import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    AuthModule,
    ProductsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.MYSQL_URL,
      host: process.env.MYSQLHOST,
      port: parseInt(process.env.MYSQLPORT || '3306'),
      username: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      ssl: { rejectUnauthorized: false },
      extra: {
        connectionLimit: 5,
        connectTimeout: 10000, // 10 segundos de timeout
      },
    }),
  ],
})
export class AppModule {}
