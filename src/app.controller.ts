import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Obter informações da API' })
  @ApiResponse({
    status: 200,
    description: 'Retorna informações básicas da API',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'online' },
        version: { type: 'string', example: '1.0.0' },
        description: { 
          type: 'string', 
          example: 'Esta é API de tarefas (todos) da turma de Infoweb 2025.' 
        },
      },
    },
  })
  getInfo() {
    return this.appService.getInfo();
  }
}