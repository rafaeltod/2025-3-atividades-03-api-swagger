import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Habilitar validação global
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Tarefas')
    .setDescription('API para gerenciamento de tarefas (todos) da turma de Infoweb 2025')
    .setVersion('1.0.0')
    .addTag('root', 'Endpoints da raiz da aplicação')
    .addTag('tasks', 'Operações CRUD de tarefas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`API rodando na porta ${port}`);
  console.log(`Documentação Swagger disponível em http://localhost:${port}/docs`);
}
bootstrap();