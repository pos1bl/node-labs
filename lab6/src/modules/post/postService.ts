import {AppDataSource} from "../../database.ts";
import {Post} from "./entities/post.ts";
import {userService} from "../user/userService.ts";

const postRepository = AppDataSource.getRepository(Post)

class PostService {
    async create(userId: string, title: string, text: string) {
        const post = new Post()
        post.dateCreation = new Date()
        post.title = title
        post.text = text
        await userService.getUser(userId).then(user => {
            if (user) post.user = user
        })
        return postRepository.save(post)
    }

    getAllPosts() {
        return postRepository.find({loadRelationIds: true})
    }

    getPostsByUserId(userId: string) {
        return postRepository.findBy({user: {id: userId}})
    }

    update(id: string, title: string, text: string) {
        const post = new Post()
        post.title = title
        post.text = text
        return postRepository.update({id: id}, post).then(result => result.affected)
    }

    delete(id: string) {
        return postRepository.delete({id: id}).then(result => result.affected)
    }
}

export const postService = new PostService()