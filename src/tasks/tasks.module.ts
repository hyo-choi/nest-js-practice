import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TasksRepository]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}

/** NOTE Module
 * nest g module {moduleName}
 * 모든 application은 최소 하나의 module을 가진다(= root module)
 * module은 관련성 높은 컴포넌트들을 정리하기에 좋은 방식이다(예: 기능별)
 * folder per module(모듈의 component 포함)로 만드는 것은 좋은 습관이다
 * module은 singleton 객체이다
 * @Module decorator를 붙인 클래스가 module이 된다
 * providers: dependency injection을 통해 module 내부에서 사용할 수 있는 provider 배열
 * controllers: module 내부에서 instantiate 되는 controller의 배열
 * exports: 다른 module으로 export할 provider 목록
 * imports: 이 모듈에 필요한 다른 module 목록
 */

/** NOTE Provider
 * 생성자에 @Injectable decorator를 붙이면 dependency injection을 통해 사용 가능
 * plain value, class, sync/async factory function, etc...
 * provider는 module에 제공되어야 한다
 * module에서 export될 수 있다 -> 그러면 다른 module에서 import할 수 있다
 * NestJS 환경의 모든 컴포넌트는 provider(@Injectable 한)를 주입할 수 있다
 */
