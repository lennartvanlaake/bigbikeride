import { Request, Response, NextFunction } from 'express';

const token: string = process.env.LOGIN_TOKEN!;

export const processLogin = (request: Request, response: Response) => {
    if (request.body.password != process.env.PASSWORD) {
        response.status(401).json({ "exception": "wrong password" });
    }
    response.cookie('token', token)
    response.status(200).json({ "message": "login success" })
}

export const isLoggedIn = (request: Request, response: Response) => {
    if (request.session.loggedIn) {
        response.status(200).json({ "message": "is logged in" })
    } else {
        response.status(401).json({ "message": "is not loged in" })
    }
}

export function checkLogin(req: Request, res: Response, next: NextFunction) {
    if (req.method == 'GET' || req.url.includes('login')) {
        next()
    } else {
        const sentCookie: string | undefined = req.headers['cookie']
        if (sentCookie?.includes(token)) {
            next()
        } else {
            res.status(401).send({
                message: 'Not logged in'
            })
        }
    }
}

