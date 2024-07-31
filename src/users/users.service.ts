import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.input';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 0,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 1,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async createUser({ username, password }: CreateUserDto) {
    const userId = this.users.length;
    this.users.push({
      userId: userId,
      password,
      username,
    });

    return this.users.filter((user) => user.userId === userId).at(0);
  }
}
