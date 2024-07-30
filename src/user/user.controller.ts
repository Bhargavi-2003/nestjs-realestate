import { Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  async profile(@Query('builderId') builderId: number) {
    return this.userService.getProfile(builderId);
  }

  @Post('logout')
  async logout(@Query('builderId') builderId: number, @Query('token') token: string) {
    return this.userService.logout(builderId, token);
  }
}
