import express, {NextFunction, Request, Response} from 'express'
import {HttpError} from 'http-errors'
import {usersController} from "./modules/user/userController.ts";
import bp from 'body-parser'
import {postController} from "./modules/post/postController.ts";

export class Server {
    private app = express();
    private port = parseInt(process.env.port || "3000", 10)

    start() {
        this.initBodyParser()
        this.initRoutes()
        this.initErrorHandling()
        this.listenPort(this.port)
    }

    private initRoutes() {
        this.app.use("/users/", usersController);
        this.app.use("/posts/", postController);
    }

    private initErrorHandling() {
        this.app.use(
            (err: Error, req: Request, res: Response, next: NextFunction) => {
                let statusCode = 500;
                if (err instanceof HttpError)
                    statusCode = err.status
                res.status(statusCode).send({
                    message: err.message,
                    status: statusCode,
                });
            }
        );
    }

    private listenPort(port: number) {
        this.app.listen(port, () => console.log("Server is up on port", port))
    }

    private initBodyParser() {
        this.app.use(bp.json())
    }
}