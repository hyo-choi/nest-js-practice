import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
  @ApiPropertyOptional({ description: 'status', enum: TaskStatus })
  status?: TaskStatus;

  @ApiPropertyOptional({ description: 'title이나 description에서 찾을 문구' })
  search?: string;
}
