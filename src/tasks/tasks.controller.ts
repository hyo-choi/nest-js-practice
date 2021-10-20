import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  // 위처럼 가져오는 것이 dependency injection
  // public, private 키워드를 붙이면 인자를 그대로 class property로 사용함(TS feature)
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
