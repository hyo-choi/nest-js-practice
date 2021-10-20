import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskByIdDto } from './dto/update-task-by-id.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
@ApiTags('Tasks API')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  // 위처럼 가져오는 것이 dependency injection
  // public, private 키워드를 붙이면 인자를 그대로 class property로 사용함(TS feature)

  @Get()
  @ApiOperation({
    summary: 'task 조회 API',
    description: 'task 정보를 가져온다.',
  })
  @ApiOkResponse({ description: '성공' })
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'id로 특정 task를 조회하는 API',
    description: 'id로 특정 task의 정보를 가져온다.',
  })
  @ApiOkResponse({ description: '성공' })
  @ApiNotFoundResponse({ description: '일치하는 task 없음' })
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'task 생성 API',
    description: 'title과 description으로 task를 생성한다.',
  })
  @ApiCreatedResponse({ description: 'task 생성' })
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  @ApiOperation({
    summary: 'task status 갱신 API',
    description: 'task의 status를 갱신한다.',
  })
  @ApiOkResponse({ description: 'task 갱신 완료' })
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskByIdDto: UpdateTaskByIdDto,
  ): Task {
    return this.tasksService.updateTaskById(id, updateTaskByIdDto.status);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'id로 특정 task를 삭제하는 API',
    description: 'id로 특정 task를 삭제한다.',
  })
  @ApiOkResponse({ description: '성공' })
  deleteTaskById(@Param('id') id: string): void {
    return this.tasksService.deleteTaskById(id);
  }
}

/** NOTE Controller
 * nest g controller {controllerName} [--no-spec]
 * client로부터 받은 요청을 처리하고 응답을 보내는 역할
 * 특정한 path에 bound되어 다룬다
 * handler를 포함(endpoint와 요청 method 다룬다)
 * dependency injection의 수혜를 볼 수 있다
 * @Controller decorator와 함께 class 만들어서 구현한다
 * ㄴ path를 받아 처리한다
 * Handler는 @Get @Post @Delete 같은 decorator 붙인 method
 */
