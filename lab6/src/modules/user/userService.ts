import {AppDataSource} from "../../database.ts";
import {User} from "./entities/user.ts";

const userRepository = AppDataSource.getRepository(User)

class UserService {
    create(username: string, email: string, age: number, info: string, address: {
        city: string;
        street: string
    }) {
        const user = new User()
        user.username = username
        user.email = email
        user.age = age
        user.info = info
        user.address = address
        return userRepository.save(user)
    }

    getAllUsers() {
        return userRepository.find()
    }

    getUser(id: string) {
        return userRepository.findOneBy({id: id})
    }

    update(id: string, username: string, email: string, age: number, info: string, address: {
        city: string;
        street: string
    }) {
        const user = new User()
        user.username = username
        user.email = email
        user.age = age
        user.info = info
        user.address = address
        return userRepository.update({id: id}, user).then(result => result.affected)
    }

    delete(id: string) {
        return userRepository.delete({id: id}).then(result => result.affected)
    }

    getAllByTitle(title: string) {
        return userRepository.createQueryBuilder("users")
            .innerJoin("posts", "p", "p.userId=users.id")
            .where("p.title=:title", {title: title})
            .getMany()
    }
}

export const userService = new UserService()