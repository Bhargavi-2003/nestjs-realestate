import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { Token } from './token.entity';
import { TokenTransaction } from './token-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Token, TokenTransaction])],
  providers: [TokenService],
  controllers: [TokenController],
})
export class TokenModule {}
