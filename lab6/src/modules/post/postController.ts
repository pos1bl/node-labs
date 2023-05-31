import {Router} from "express";
import {postService} from "./postService.ts";
import httpErrors from "http-errors";

const {BadRequest} = httpErrors

const router = Router()

router.get("/", async (req, res, next) => {
    try {
        res.json(await postService.getAllPosts())
    } catch (err) {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    const {userId, title, text} = req.body
    try {
        res.json(await postService.create(userId, title, text))
    } catch (err) {
        next(new BadRequest("Invalid parameters"))
    }
})
export const postController = router