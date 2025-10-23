import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  ABERTO = 'aberto',
  FAZENDO = 'fazendo',
  FINALIZADO = 'finalizado',
}

@Entity()
export class Task {
  @ApiProperty({
    description: 'ID único da tarefa',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Título da tarefa',
    example: 'Estudar NestJS',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'Descrição detalhada da tarefa',
    example: 'Aprender sobre documentação de APIs com Swagger',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'Status atual da tarefa',
    enum: TaskStatus,
    example: TaskStatus.ABERTO,
  })
  @Column({
    type: 'text',
    enum: TaskStatus,
    default: TaskStatus.ABERTO,
  })
  status: TaskStatus;

  @ApiProperty({
    description: 'Data de criação da tarefa',
    example: '2025-01-15T10:30:00.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização da tarefa',
    example: '2025-01-15T14:30:00.000Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}