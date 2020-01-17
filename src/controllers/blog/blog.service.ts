import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";

@Injectable()
export class BlogServices {
  @Models("blog") db: any;

  constructor() {}
  
}