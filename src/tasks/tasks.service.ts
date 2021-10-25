import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ id, user });
    if (!found) {
      throw new NotFoundException([`Task with id "${id}" not found`]);
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async updateTaskById(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);

    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    // NOTE remove와 delete가 있는데 remove는 entity 객체를 요구하므로 DB에 접근해야 해서 비권장
    const result = await this.tasksRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException([`Task with id "${id}" not found`]);
    }
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
