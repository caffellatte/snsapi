import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_OR_ROUNDS),
    );
    const result = await this.usersService.createUser(username, hashedPassword);
    return result;
  }
}
