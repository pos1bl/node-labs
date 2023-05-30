import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from './Post';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column({ nullable: true })
  info?: string;

  @Column('json', { nullable: true })
  address?: { city: string; street: string };

  @OneToMany(() => Post, post => post.user)
  posts: Post[];
}
