import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import prisma from 'prisma/client';
import { CreateUserDto } from './dto/create-user.input';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  async findOne(username: string): Promise<User | undefined> {
    const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
        },
      },
    });
    return user;
  }

  async createUser({ username, password }: CreateUserDto) {
    const encrypterPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: encrypterPassword,
      },
    });
    const { password: _password, ...result } = user;
    return result;
  }
}
