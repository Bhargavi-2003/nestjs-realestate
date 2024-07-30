import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './token.entity';
import { TokenTransaction } from './token-transaction.entity';
import { DefineTokenDto } from './dto/define-token.dto';
import { CreateTokenDto } from './dto/create-token.dto';
import { DistributeTokenDto } from './dto/distribute-token.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private tokensRepository: Repository<Token>,
    @InjectRepository(TokenTransaction) private tokenTransactionsRepository: Repository<TokenTransaction>,
  ) {}

  async defineToken(defineTokenDto: DefineTokenDto): Promise<{ tokenId: number, status: string }> {
    const token = this.tokensRepository.create(defineTokenDto);
    await this.tokensRepository.save(token);
    return { tokenId: token.id, status: 'Token defined successfully' };
  }

  async createToken(createTokenDto: CreateTokenDto): Promise<{ tokenId: number, status: string }> {
    const token = await this.tokensRepository.findOne({where:{id:createTokenDto.tokenId}});
    if (token) {
      token.status = 'created';
      await this.tokensRepository.save(token);
      return { tokenId: token.id, status: 'Token created successfully' };
    }
    throw new Error('Token not found');
  }

  async getTokens(builderId: number): Promise<{ tokens: any[] }> {
    const tokens = await this.tokensRepository.find({ where: { builderId } });
    return { tokens };
  }

  async distributeToken(distributeTokenDto: DistributeTokenDto): Promise<{ distributionId: number, status: string }> {
    const transaction = this.tokenTransactionsRepository.create(distributeTokenDto);
    await this.tokenTransactionsRepository.save(transaction);
    return { distributionId: transaction.id, status: 'Tokens distributed successfully' };
  }

  async getTokenTransactions(builderId: number, tokenId: number): Promise<{ transactions: any[] }> {
    const transactions = await this.tokenTransactionsRepository.find({ where: { builderId, tokenId } });
    return { transactions };
  }
}
