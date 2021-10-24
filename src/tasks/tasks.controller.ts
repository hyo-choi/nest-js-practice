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
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-by-id.dto';
import { Task } from './task.entity';
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
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'id로 특정 task를 조회하는 API',
    description: 'id로 특정 task의 정보를 가져온다.',
  })
  @ApiOkResponse({ description: '성공' })
  @ApiBadRequestResponse({ description: '요청 양식 오류' })
  @ApiNotFoundResponse({ description: '일치하는 task 없음' })
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'task 생성 API',
    description: 'title과 description으로 task를 생성한다.',
  })
  @ApiCreatedResponse({ description: 'task 생성' })
  @ApiBadRequestResponse({ description: '요청 양식 오류' })
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  /** NOTE PUT VS PATCH
   * put은 대상 data 전체를 수정
   * patch는 대상 data 일부를 수정
   */
  @Patch('/:id/status')
  @ApiOperation({
    summary: 'task status 갱신 API',
    description: 'task의 status를 갱신한다.',
  })
  @ApiOkResponse({ description: 'task 갱신 완료' })
  @ApiBadRequestResponse({ description: '요청 양식 오류' })
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskById(id, status);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'id로 특정 task를 삭제하는 API',
    description: 'id로 특정 task를 삭제한다.',
  })
  @ApiOkResponse({ description: '성공' })
  @ApiBadRequestResponse({ description: '요청 양식 오류' })
  deleteTaskById(@Param('id') id: string): Promise<void> {
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

/** NOTE pipe
 * handler(controller method)가 호출되기 전 argument에 process한다(route handler에 의해)
 * 데이터 변환과 유효성 검사를 수행할 수 있다
 * 원본/수정된 데이터를 반환할 수 있다
 * exception을 throw할 수도 있다. 던져진 예외는 NestJS에 의해 핸들링되고 오류 응답으로 파싱된다
 * 요청이 들어왔을 때 handler가 식별되면 pipe에서 유효성 검사가 이루어지고
 * 1. 검사에 성공한 경우 handler가 실행되어 적절한 응답을 보낸다
 * 2. 검사에 실패한 경우 BadRequestException이 throw되어 400 응답을 보낸다
 * @Injectable()으로 annotate된 클래스이다
 * 반드시 PipeTransform interface를 implement하도록 구현해야 한다. 따라서 모든 pipe가 transform 메소드를 가진다
 * ㄴ transform() 메소드는 value와 metadata(optional)을 매개변수(parameter)로 가진다
 * transform()에서 return된 값이 무엇이든 route handler로 넘겨진다. 예외는 client에게 반환된다
 * pipe는 다양한 방식으로 사용될 수 있다
 * - Handler-level pipe는 @UsePipes() decorator를 통해 사용된다. 들어오는 요청의 모든 매개변수를 process한다
 * - Parameter-level pipe는 특정 parameter만 process한다
 * - Global pipe는 application level(bootstrap 함수 내부)에서 정의되며 모든 요청에 적용된다
 * - Parameter-level VS Handler-level
 *    P-level이 slimmer, cleaner하기는 하나 handler에 extra code를 필요로 할 때가 있어 코드를 messy하고 유지보수하기 어렵게 만든다
 *    H-level은 코드를 길게 만들기는 하지만 extra code를 요구하지 않고 유지/확장이 용이하다. 또 인자를 식별할 책임이 pipe 파일에 집중된다
 * 비동기로 구현될 수도 있다
 * @nestjs/common 모듈의 default pipe
 * - ValidationPipe: DTO에 매핑되는지 여부를 확인
 * - ParseIntPipe
 * NOTE class validator, class-transformer 설치
 * https://github.com/typestack/class-validator
 */

/** NOTE parameter(매개변수) VS argument(전달인자)
 * 함수의 시그니처에 사용된 변수가 parameter
 * 실제로 함수에 전달되는 값이 argument
 */
