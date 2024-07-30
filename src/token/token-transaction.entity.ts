import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TokenTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  builderId: number;

  @Column()
  tokenId: number;

  @Column()
  recipientAddress: string;

  @Column()
  amount: number;

  @Column()
  senderAddress: string;

  @Column()
  date: Date;

  @Column()
  status: string;
}
