import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";
import { BlogServices } from "./blog.service";

@Controller({
  model: "./blog.model",
  route: "/blog",
})
export class BlogController {

  constructor(private services: BlogServices) {}
  
}