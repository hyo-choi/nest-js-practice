import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {}

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
