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

      return { status: 200, message: "Blogs successfully fetch.", data: result, meta: {} };
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

      return { status: 200, message: "Blog successfully fetch.", data: result, meta: {} };
    } catch (error) {
      return { status: 400, message: error.errmsg ? error.errmsg : error.toString(), data: [], meta: {} };
    }
  }

  async post(body: any) {
    let blog;

    try {
      blog = await this.model.create(body);
    } catch (error) {
      return { status: 422, message: error.errmsg ? error.errmsg : error.toString(), data: [], meta: {} };
    }

    try {
      const result = JSON.parse(JSON.stringify(await blog.save()));
      return { status: 200, message: "Blog successfully added.", data: result, meta: {} };
    } catch (error) {
      await this.model.findOneAndDelete({ _id: blog.id });
      return { status: 422, message: error.errmsg ? error.errmsg : error.toString(), data: [], meta: {} };
    }
  }

  async patch(id: any, body: any) {
    try {
      const result = await this.model.findOneAndUpdate({ _id: id }, { $set: (body) }, { new: true });
      return { status: 200, message: "Blog successfully updated.", data: result, meta: {} };
    } catch (error) {
      return { status: 422, message: error.errmsg ? error.errmsg : error.toString(), data: [], meta: {} };
    }
  }
}