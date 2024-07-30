import { IsNumber } from 'class-validator';

export class CreateTokenDto {
  @IsNumber()
  builderId: number;

  @IsNumber()
  projectId: number;

  @IsNumber()
  tokenId: number;
}
