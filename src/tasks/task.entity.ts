import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}

/** NOTE ORM
 * NOTE 장점
 * 데이터 모델을 한 군데 작성하므로 유지보수하기 쉽고 반복이 적어진다
 * 많은 것이 자동으로 된다:데이터베이스 관리, 데이터 타입, 관계 등
 * SQL 문법(배우기는 쉽고 마스터하기는 어려운)을 사용할 필요가 없다
 * DB 추상화: DB 타입을 원할 때마다 변경할 수 있다
 * OOP를 이용하므로 상속 등을 달성하기 쉽다
 * NOTE 단점
 * 새로 배워야 하고 ORM 라이브러리가 늘 단순하지는 않다
 * 퍼포먼스가 괜찮지만 소홀히 여겨지기 쉽다
 * 뒷단에서 일어나는 일에 소홀해지기 쉬워서 유지보수 문제를 일으키기 쉽다
 */

/** NOTE TypeORM
 * Node.js 위에서 TypeScript와 함께 쓰이는 ORM 라이브러리
 * 다음의 것들을 정의하고 관리할 수 있도록 해준다: entity, repository, column, relation, replication, index, logging, 이외의 수많은 것들
 * 예: 'Ashley' && 'DONE'인 모든 task 찾기
 * -> const tasks = await Task.find({ status: 'DONE', user: 'Ashley' });
 */

/** NOTE Pattern: Active Record VS Data Mapper
 * TypeORM은 두 패턴 모두 지원하고, 이 강의에서는 Data Mapper Pattern 사용
 * Active Record Pattern은 Entity 내부에 DB와 상호작용하는 method를 포함
 * - 작은 app에서는 simple해서 좋은 방법일 수 있으나 model이 DB 조작 로직과 함께 있으면 messy해지기 쉽다
 * Data Mapper Pattern은 Entity 자체에는 pure하게 property만 두고 Repository를 사용해 DB와 상호작용
 */
