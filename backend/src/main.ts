import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const frontendUrl = configService.get('FRONTEND_URL');

  // HABILITAR CORS
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  const port = Number(configService.get('PORT')) || 3000;
  await app.listen(port);
}
bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
});
