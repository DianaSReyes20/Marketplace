import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    // Configuración de TypeORM para desarrollo
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '1234',
    //   database: 'marketplace',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true, // Solo en desarrollo
    // }),
    // Configuración de TypeORM para Railway
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'nozomi.proxy.rlwy.net', // host de Railway
      port: 45876, // puerto de Railway
      username: 'root', // username de Railway
      password: 'tu_password_aqui', // pon aquí la contraseña que Railway oculta
      database: 'railway', // nombre de la base
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // cuidado: solo para desarrollo
    }),
  ],
})
export class AppModule {}
