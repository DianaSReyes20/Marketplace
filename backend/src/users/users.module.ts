import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Esto proporciona el UserRepository
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Importante para que AuthModule lo use
})
export class UsersModule {}
