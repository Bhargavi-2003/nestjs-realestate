import {BadGatewayException,NotFoundException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//import { InjectRepository } from '@nestjs/typeorm';
//import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly DatabaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ builderId: number, token: string }> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.DatabaseService.user.create({data:{
      email: registerDto.email,
      password: hashedPassword}
    });
    if (user){
      throw new BadGatewayException('User with this email already exists')
    }
    //await this.DatabaseService.user.save(user);
    const token = this.jwtService.sign({ id: user.id });
    return { builderId: user.id, token };
  }

  async login(loginDto: LoginDto): Promise<{ builderId: number, token: string }> {
    const {email,password} = loginDto;
    console.log(email)
    console.log(password)
    const user = await this.DatabaseService.user.findFirst({ where: { email: email } });
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    if (user && await bcrypt.compare(password, user.password)) {
      const token = this.jwtService.sign({ id: user.id });
      return { builderId: user.id, token };
    }
    throw new Error('Invalid credentials');
  }
}
