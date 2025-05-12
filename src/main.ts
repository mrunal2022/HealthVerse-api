import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = require('cors');
  const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
    // Swagger Documentation
    const config = new DocumentBuilder()
    .setTitle('to get blog list')
    .setDescription('To get blog list')
    .setVersion('1.0')
    .addTag('HealthVerse')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
