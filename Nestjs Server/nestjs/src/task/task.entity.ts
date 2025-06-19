import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@ObjectType()
@Entity('tasks')
export class TaskEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 255 })
  todo: string;

  @Field()
  @Column({ default: false, type: 'bit' })
  completed: boolean;

  @Field()
  @CreateDateColumn({ type: 'datetime' })
  date: Date;

  @ManyToOne(() => UserEntity, (user) => user.todos, { onDelete: 'CASCADE' })
  user: UserEntity;
}
