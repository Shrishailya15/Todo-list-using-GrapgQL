import { Field, ObjectType } from '@nestjs/graphql';
import { TaskEntity } from 'src/task/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@ObjectType() 
@Entity('users')
export class UserEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 100 })
  name: string;

  @Field()
  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 }) 
  password: string;

  @Field(() => [TaskEntity], { nullable: true }) 
  @OneToMany(() => TaskEntity, (todo) => todo.user)
  todos: TaskEntity[];

  @Field()
  @CreateDateColumn()
  created_at: Date;
}
