import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entities/user.ts";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({nullable: false})
    dateCreation: Date

    @Column({nullable: false})
    title: string

    @Column({nullable: false})
    text: string

    @ManyToOne(() => User)
    user: User
}