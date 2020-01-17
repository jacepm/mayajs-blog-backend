import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";

@Injectable()
export class UserServices {
  @Models("user") model: any;

  constructor() {}

  async get() {
    try {
      const result = await this.model.find();

      if(result < 1) {
        return { status: 400, message: "Users not found!", data: [], meta: {} }
      }

      return { status: 200, message: "Users successfully fetch.", data: result, meta: {} };
    } catch (error) {
      return { status: 400, message: error.errmsg ? error.errmsg : error.toString(), data: [], meta: {} };
    }
  }
}