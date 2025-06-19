import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/constants';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    // Convert ExecutionContext to GraphQL Context
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req; // Get HTTP request

    // Extract token
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new HttpException('Token not found', 401);
    }

    try {
      // Verify JWT token
      const payload = this.jwtService.verify(token, { secret: config.secret });

      // Attach user payload to request
      request.user = payload;

      return true;
    } catch (ex) {
      console.log('Invalid token:', ex);
      throw new HttpException('Invalid token', 401);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
