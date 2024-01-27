import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('AIMA API')
    .setDescription('POC for AIMA API')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header'})
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {swaggerOptions:{tagsSorter: 'alpha', operationsSorter: 'alpha'}});
  const dbinit= await app.get(AppService).runInitScript();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
