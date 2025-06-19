import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [TaskService, TaskResolver],
})
export class TaskModule {}
