import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class DefineTokenDto {
  @IsNumber()
  builderId: number;

  @IsNumber()
  projectId: number;

  @IsString()
  @IsNotEmpty()
  tokenName: string;

  @IsString()
  @IsNotEmpty()
  tokenSymbol: string;

  @IsNumber()
  totalSupply: number;

  @IsObject()
  additionalFeatures: object;
}
