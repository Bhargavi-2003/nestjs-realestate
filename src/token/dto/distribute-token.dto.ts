import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DistributeTokenDto {
  @IsNumber()
  builderId: number;

  @IsNumber()
  tokenId: number;

  @IsString()
  @IsNotEmpty()
  recipientAddress: string;

  @IsNumber()
  amount: number;
}
