import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const whitelist = [
    /https?:\/\/([a-z0-9-]+[.])*qorporates[.]com/,
    'http://localhost:6007',
    'http://localhost:6008',
    'http://localhost:3000',
    'http://localhost:3002',
    'http://localhost:3500',
    'http://localhost:4200',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3500',
    'http://127.0.0.1:6007',
    'http://192.168.100.115:3000',
    'http://192.168.100.115:3500',
    'https://qoobus.com',
  ];

  app.enableCors({
    origin: whitelist,
    methods: 'GET,POST',
    credentials: true,
  });

  const options = new DocumentBuilder()
    .setTitle('API gateway')
    .setDescription('Facing API for Client UI')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  app.use('/swagger.json', (req, res) => res.json(document));
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const configService: ConfigService = app.get(ConfigService);

  await app.listen(configService.port);
  console.log(`Server is listening on http://localhost:${configService.port}`);
  console.log(`Find docs on http://localhost:${configService.port}/docs`);
}
bootstrap();
