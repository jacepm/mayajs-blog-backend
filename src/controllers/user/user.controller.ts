import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";
import { UserServices } from "./user.service";

@Controller({
  model: "./user.model",
  route: "/user",
})
export class UserController {

  constructor(private services: UserServices) {}
  
}