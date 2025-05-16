import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

// Define el tipo para el usuario sin password
type SafeUser = Omit<User, 'password'>;

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService, // Añadido UsersService
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    const user: SafeUser | null = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.authService.login({
      email: user.email, // Ahora TypeScript sabe que email existe
      id: user.id, // Y que id existe
    });
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<{ id: number; message: string }> {
    // Validación manual como respaldo
    if (!registerDto || !registerDto.password) {
      throw new Error('Datos de registro inválidos');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = await this.usersService.create({
      email: registerDto.email,
      password: hashedPassword,
      role: 'seller',
    });

    return {
      id: newUser.id,
      message: 'Registro exitoso',
    };
  }
}
