import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../task.model';

export class UpdateTaskByIdDto {
  @ApiProperty({ description: 'status', enum: TaskStatus })
  status: TaskStatus;
}
