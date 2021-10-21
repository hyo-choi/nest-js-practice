import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  @ApiProperty({ description: 'status', enum: TaskStatus })
  status: TaskStatus;
}
