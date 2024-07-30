import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  builderId: number;

  @Column()
  projectId: number;

  @Column()
  tokenName: string;

  @Column()
  tokenSymbol: string;

  @Column()
  totalSupply: number;

  @Column('json')
  additionalFeatures: object;

  @Column({ default: 'defined' })
  status: string;
}
