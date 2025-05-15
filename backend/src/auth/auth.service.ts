import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: {
    email: string;
    password: string;
  }): Promise<{ id: number }> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = await this.usersService.create({
      email: registerDto.email,
      password: hashedPassword,
      role: 'seller', // Rol por defecto
    });
    return { id: newUser.id };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // Opción 1 (recomendada): Eliminar directamente la propiedad
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { email: string; id: number }) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
