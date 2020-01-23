import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { environment as env } from "../environments";

export const authToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const id: string = req.params.id;
  try {
    const unvalidatedUrls = [
      { path: "/user/login", method: "POST" },
      { path: "/blog", method: "GET" },
      { path: "/blog/" + id, method: "GET" }
    ];

    const unprotected = unvalidatedUrls.filter(
      url => url.path === req.url && url.method === req.method
    );

    console.log(unprotected);

    if (unprotected.length > 0) {
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
};
