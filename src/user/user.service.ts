import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getProfile(builderId: number): Promise<{ builderId: number, email: string }> {
    const user = await this.usersRepository.findOne({ where: { id: builderId } });
    if (user) {
      return { builderId: user.id, email: user.email };
    }
    throw new Error('User not found');
  }

  async logout(builderId: number, token: string): Promise<{ status: string }> {
    // Implement your logout logic here, such as invalidating the token
    return { status: 'Logged out successfully' };
  }
}

