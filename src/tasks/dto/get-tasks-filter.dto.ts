import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  @ApiPropertyOptional({ description: 'status', enum: TaskStatus })
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'title이나 description에서 찾을 문구' })
  search?: string;
}
