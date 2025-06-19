import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(name: string, email: string, password: string): Promise<UserEntity> {
    const user = new UserEntity();
    user.name = name;
    user.created_at = new Date();
    user.email = email;
    
    const hash = crypto.createHash('sha256');
    hash.update(password);
    user.password = String(hash.digest());

    return await this.userRepository.save(user);
  }

  async signin(email: string, password: string): Promise<{ token: string }> {
    // Encrypt password
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const encryptedPassword = String(hash.digest());

    // Check if the user exists
    const user = await this.userRepository.findOneBy({
      email,
      password: encryptedPassword,
    });

    if (!user) {
      throw new HttpException('Invalid credentials', 401);
    }

    // Create JWT Token
    const token = this.jwtService.sign({ id: user.id, name: user.name });
    return { token };
  }
}
