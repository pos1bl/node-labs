import {DataSource} from "typeorm";
import * as dotenv from 'dotenv'
import {User} from "./modules/user/entities/user.ts";
import {Post} from "./modules/post/entities/post.ts";

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5433', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "user",
    synchronize: false,
    logging: ["error", "warn", "info"],
    entities: [User, Post],
    migrations: ['./migrations/**/*.ts']
})

AppDataSource.initialize()