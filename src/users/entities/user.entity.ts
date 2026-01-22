import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({
    nullable: true,
  })
  role?: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;
}
