import {Router} from "express";
import {userService} from "./userService.ts";
import httpErrors from "http-errors";
import {User} from "./entities/user.ts";

const {NotFound, BadRequest} = httpErrors

const router = Router()

router.get("/", async (req, res, next) => {
    try {
        const amountPerPage = 2
        const title = req.query.title
        let users: User[]
        if (title)
            users = await userService.getAllByTitle(title.toString())
        else
            users = await userService.getAllUsers()
        const age = req.query.age
        if (age)
            users = users.filter(user => user.age === parseInt(age.toString(), 10))
        const city = req.query.city
        if (city)
            users = users.filter(user => user.address).filter(user => user.address.city === city.toString())
        let page = 1
        if (req.query.page) {
            page = parseInt(req.query.page.toString(), 10)
            res.json(users.slice(amountPerPage * (page - 1), amountPerPage * page))
        } else
            res.json(users)
    } catch (err) {
        next(err)
    }
})

router.get("/:userId", async (req, res, next) => {
    try {
        const user = await userService.getUser(req.params.userId)
        if (!user)
            next(new NotFound("No such user"))
        else
            res.json(user)
    } catch (err) {
        next(new BadRequest("Invalid id"))
    }
})

router.post("/", async (req, res, next) => {
    const {username, email, age, info, address} = req.body
    try {
        res.json(await userService.create(username, email, age, info, address))
    } catch (err) {
        next(new BadRequest("Invalid parameters"))
    }
})

router.put("/:userId", async (req, res, next) => {
    const {username, email, age, info, address} = req.body
    try {
        const affected = await userService.update(req.params.userId, username, email, age, info, address)
        if (affected)
            res.json(affected)
        else
            next(new NotFound("No such user"))
    } catch (err) {
        next(err)
    }
})

router.delete("/:userId", async (req, res, next) => {
    try {
        const affected = await userService.delete(req.params.userId)
        if (affected)
            res.json(affected)
        else
            next(new NotFound("No such user"))
    } catch (err) {
        next(err)
    }
})

export const usersController = router