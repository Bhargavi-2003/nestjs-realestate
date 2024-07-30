import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TokenService } from './token.service';
import { DefineTokenDto } from './dto/define-token.dto';
import { CreateTokenDto } from './dto/create-token.dto';
import { DistributeTokenDto } from './dto/distribute-token.dto';

@Controller('api/token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Post('define')
  async define(@Body() defineTokenDto: DefineTokenDto) {
    return this.tokenService.defineToken(defineTokenDto);
  }

  @Post('create')
  async create(@Body() createTokenDto: CreateTokenDto) {
    return this.tokenService.createToken(createTokenDto);
  }

  @Get('manage')
  async manage(@Query('builderId') builderId: number) {
    return this.tokenService.getTokens(builderId);
  }

  @Post('distribute')
  async distribute(@Body() distributeTokenDto: DistributeTokenDto) {
    return this.tokenService.distributeToken(distributeTokenDto);
  }

  @Get('transactions')
  async transactions(@Query('builderId') builderId: number, @Query('tokenId') tokenId: number) {
    return this.tokenService.getTokenTransactions(builderId, tokenId);
  }
}
