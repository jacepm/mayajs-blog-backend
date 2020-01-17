import { Check, Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";
import { BlogServices } from "./blog.service";

@Controller({
  model: "./blog.model",
  route: "/blog",
})
export class BlogController {

  constructor(private services: BlogServices) {}
  
  @Get({ path: "/", middlewares: [] })
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.services.get();
    res.status(result.status).send(result);
  }

  @Get({ path: "/:id", middlewares: [] })
  async getId(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.services.getId(req.params.id);
    res.status(result.status).send(result);
  }

  @Post({
    path: "/",
    middlewares: [
      Check("title").isString(),
      Check("author").isString(),
      Check("content").isString(),
      Check("date").isDate()
    ]
  })
  async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.services.post(req.body);
    res.status(result.status).send(result);
  }

  @Patch({
    path: "/:id",
    middlewares: [
      Check("title").isString(),
      Check("author").isString(),
      Check("content").isString(),
      Check("date").isDate(),
      Check("deleted").isBoolean()
    ]
  })
  async patch(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.services.patch(req.params.id, req.body);
    res.status(result.status).send(result);
  }
}