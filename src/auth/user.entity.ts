import { Task } from '../tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
  /** NOTE eager
   * eager가 true인 경우 DB에서 객체를 불러올 때(여기서는 User) eager가 붙은 객체(여기서는 tasks)도 함께 불러옴
   */
}
