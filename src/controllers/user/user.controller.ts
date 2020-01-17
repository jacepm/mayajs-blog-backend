import { Check, Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";
import { UserServices } from "./user.service";

@Controller({
  model: "./user.model",
  route: "/user",
})
export class UserController {

  constructor(private services: UserServices) {}
  
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
      Check("name").isString(),
      Check("userName").isString(),
      Check("password").isPassword(),
      Check("confirmPassword").isPassword(),
      Check("email").isEmail()
    ]
  })
  async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.services.post(req.body);
    res.status(result.status).send(result);
  }

  @Patch({
    path: "/",
    middlewares: [
      Check("name").isString(),
      Check("userName").isString(),
      Check("email").isEmail(),
      Check("deleted").isBoolean()
    ]
  })
  async patch(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.services.patch(req.params.id, req.body);
    res.status(result.status).send(result);
  }
}