import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { environment as env } from "../environments";

export function authToken(req: Request, res: Response, next: NextFunction, value: string): void {
    try {
        const unvalidatedUrls = [
            "/user/login",
            "/blog",
            "/blog/" + value
        ];

        if (unvalidatedUrls.indexOf(req.url) > -1) {
            return next();
        }

        const header = req.headers["authorization"];

        if (typeof header !== "undefined") {
            const bearer = header.split(" ");
            const token = bearer[1];
            req.body.token = token;
            jwt.verify(req.body.token, env.AUTH_TOKEN_KEY);
            return next();
        } else {
            res.sendStatus(403);
        }
    } catch (error) {
        console.log(error);
        res.status(401).send("Token is not valid!");
    }
}