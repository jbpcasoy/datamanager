import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.input';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 0,
      username: 'john',
      password: '$2b$10$esn051dkT/4vVZx41/TL0OkFjUHr1ilhGvs5ipfruGzrvzRWV6a3y',
    },
    {
      userId: 1,
      username: 'maria',
      password: '$2b$10$YAnplGAB080RGj96MzwVreR7l0OQtk/VkiaJwjnlspkJ7SRgKFH0O',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async createUser({ username, password }: CreateUserDto) {
    const userId = this.users.length;
    const encrypterPassword = await bcrypt.hash(password, 10);
    this.users.push({
      userId: userId,
      password: encrypterPassword,
      username,
    });

    const user = this.users.filter((user) => user.userId === userId).at(0);
    return user;
  }
}
