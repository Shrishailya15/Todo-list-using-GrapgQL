import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private todoRepository: Repository<TaskEntity>,
  ) { }

  async getTasksForUser(userId: string): Promise<TaskEntity[]> {
    return await this.todoRepository.find({ where: { user: { id: userId } } });
  }

  async createTask(userId: string, todoText: string): Promise<void> {
    const todo = this.todoRepository.create({
      todo: todoText,
      completed: false,
      user: { id: userId } as any,
    });
    await this.todoRepository.save(todo);
  }

  async updateTaskStatus(id: string, userId: string, completed: boolean): Promise<void> {
    await this.todoRepository.update({ id, user: { id: userId } }, { completed });
  }

  async deleteTask(id: string, userId: string): Promise<void> {
    const task = await this.todoRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user'],
    });
    console.log("Fetched Task:", task);
    if (!task) {
      console.error("Task not found or unauthorized. Task ID:", id, "User ID:", userId);
      throw new Error("Task not found or unauthorized");
    }
    await this.todoRepository.delete({ id });
    console.log("Task deleted successfully:", id);
  }

}
