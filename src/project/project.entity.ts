import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  builderId: number;

  @Column()
  projectName: string;

  @Column()
  description: string;

  @Column()
  location: string;
}
