import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarefas retornada com sucesso',
    type: [Task],
  })
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma tarefa por ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID da tarefa',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Tarefa encontrada',
    type: Task,
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar uma nova tarefa' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: 201,
    description: 'Tarefa criada com sucesso',
    type: Task,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma tarefa' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID da tarefa a ser atualizada',
    example: 1,
  })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({
    status: 200,
    description: 'Tarefa atualizada com sucesso',
    type: Task,
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar uma tarefa' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID da tarefa a ser deletada',
    example: 1,
  })
  @ApiResponse({
    status: 204,
    description: 'Tarefa deletada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.remove(id);
  }
}