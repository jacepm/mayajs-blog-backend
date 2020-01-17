import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";

@Injectable()
export class BlogServices {
  @Models("blog") model: any;

  constructor() {}
  
  async get() {
    try {
      const result = await this.model.find();

      if(result < 1) {
        return { status: 400, message: "Blogs not found!", data: [], meta: {} }
      }

      return { status: 200, message: "Blogs successfully fetch." };
    } catch (error) {
      return { status: 400, message: error.errmsg ? error.errmsg : error.toString(), data: [], meta: {} };
    }
  }

  async getId(id: any) {
    try {
      const result = await this.model.find({ _id: id });

      if(!result) {
        return { status: 400, message: "Blog not found!", data: [], meta: {} }
      }

      return { status: 200, message: "Blog successfully fetch." };
    } catch (error) {
      return { status: 400, message: error.errmsg ? error.errmsg : error.toString(), data: [], meta: {} };
    }
  }
}