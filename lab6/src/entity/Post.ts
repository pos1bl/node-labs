import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreation: Date;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.posts)
  user: Promise<User>;
}

