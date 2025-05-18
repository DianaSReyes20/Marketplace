import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST') || configService.get('MYSQLHOST'),
        port:
          configService.get<number>('DB_PORT') ||
          configService.get<number>('MYSQLPORT'),
        username:
          configService.get('DB_USERNAME') || configService.get('MYSQLUSER'),
        password:
          configService.get('DB_PASSWORD') ||
          configService.get('MYSQLPASSWORD'),
        database:
          configService.get('DB_NAME') || configService.get('MYSQLDATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
      }),
    }),
  ],
})
export class AppModule {}
