import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserEntity) 
  async signup(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<UserEntity> {
    return await this.userService.signup(name, email, password);
  }
  

  @Mutation(() => String)
  async signin(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string> {
    const result = await this.userService.signin(email, password);
    return result.token;
  }
}
