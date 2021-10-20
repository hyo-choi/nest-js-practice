import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  /**이런 property는 private으로 하는 게 좋음
   * 왜냐면 이 service를 사용하는 다른 코드에서 변경이 일어나고
   * 이로 인해 에러가 발생한 경우 오류 파악이 어렵기 때문
   */

  getAllTasks(): Task[] {
    /** public 붙이지 않아도 TS에서는 기본 public
     * 붙이고 싶으면 붙여도 되는데 일관성 있게 할 것
     */
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  updateTaskById(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}

/** NOTE Service
 * [COMMAND] nest g service {serviceName} [--no-spec]
 * provider를 통해 구현된다 (module의 provider에 위치)
 * 모든 provider가 service인 것은 아니다
 * 일반적인 concept(예: 앵귤러)이고 NestJS, JS, back-end만의 특징이 아니다
 * Singleton 객체이며 @Injectable decorator를 통해 모듈에 제공된다
 * ㄴ singleton이란? 단 하나의 객체가 app 전체에 공유되는 방식
 * 대부분의 비즈니스 로직이 service 내부에 위치한다
 * ㄴ controller에서 service를 불러 사용하는 등
 */
