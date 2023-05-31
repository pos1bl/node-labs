import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        nullable: false,
        unique: true
    })
    username: string

    @Column({nullable: false})
    email: string

    @Column({nullable: false})
    age: number

    @Column({nullable: true})
    info: string

    @Column('simple-json', {nullable: true})
    address: {
        city: string,
        street: string
    }
}