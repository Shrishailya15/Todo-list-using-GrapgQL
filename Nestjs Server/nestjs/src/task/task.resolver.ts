import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/user/auth.guard';
import { TaskEntity } from './task.entity';
import { TaskService } from './task.service';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';


@Resolver(() => TaskEntity)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [TaskEntity], { name: 'getTasks' })
  @UseGuards(GqlAuthGuard) // Protecting the query
  async getTasks(@Context() context) {
    const userId = context.req.user.id;
    return await this.taskService.getTasksForUser(userId);
  }
 
  @Mutation(() => String, { name: 'createTask' })
  @UseGuards(GqlAuthGuard) 
  async createTask(@Context() context, @Args('todo') todo: string) {
    const userId = context.req.user.id;
    await this.taskService.createTask(userId, todo);
    return "Task Added sussefully"
  }

  @Mutation(() => String, { name: 'updateTaskStatus' })
  @UseGuards(GqlAuthGuard)
  async updateTaskStatus(@Context() context, @Args('id') id: string,@Args('completed') completed: boolean) {
    const userId = context.req.user.id;
    await this.taskService.updateTaskStatus(id, userId, completed);
    return 'Task updated successfully';
  } 

  @Mutation(() => String, { name: 'deleteTask' })
  @UseGuards(GqlAuthGuard)
  async deleteTask(@Context() context, @Args('id') id: string) { 
    const userId = context.req.user.id;
    await this.taskService.deleteTask(id, userId);
    return 'Task deleted successfully';
  }
}
