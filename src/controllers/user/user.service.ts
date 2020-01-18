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

  async getId(id: any) {
    try {
      const result = await this.model.findOne({ _id: id });

      if(!result) {
        return { status: 400, message: "User not found!", data: [], meta: {} }
      }

      return { status: 200, message: "User successfully fetch.", data: result, meta: {} };
    } catch (error) {
      return { status: 400, message: error.errmsg ? error.errmsg : error.toString(), data: [], meta: {} };
    }
  }

  async post(body: any) {
    const { password, confirmPassword } = body;

    if (password !== confirmPassword) {
      return { status: 422, message: "Password and Confirm Password didn't matched!", data: [], meta: {} };
    }

    let user;

    try {
      user = await this.model.create(body);
    } catch (error) {
      return { status: 422, message: error.errmsg ? error.errmsg : error.toString(), data: [], meta: {} };
    }
    
    user.setPassword(password);

    try {
      const result = JSON.parse(JSON.stringify(await user.save()));
      delete result.password;
      return { status: 200, message: "User successfully added.", data: result, meta: {} };
    } catch (error) {
      await this.model.findOneAndDelete({ _id: user.id });
      return { status: 422, message: error.errmsg ? error.errmsg : error.toString(), data: [], meta: {} };
    }
  }

  async patch(id: any, body: any) {
    try {
      const result = await this.model.findOneAndUpdate({ _id: id }, { $set: body }, { new: true });
      return { status: 200, message: "User successfully updated.", data: result, meta: {} };
    } catch (error) {
      return { status: 422, message: error.errmsg ? error.errmsg : error.toString(), data: [], meta: {} };
    }
  }

  async login(body: any) {
    const { userName, password, token } = body;

    let result;

    try {
      result = await this.model.findOne({ userName: userName });

      if (!result) {
        return { status: 401, message: "Username not found!", data: [], meta: {} };
      }

      if (!result.comparePassword(password)) {
        return { status: 401, message: "Username or Password didn't matched!", data: [], meta: {} };
      }

      result.setToken(token);
      
      return { status: 200, message: `${result.userName} is logged in.`, data: result, meta: {} };
    } catch (error) {
      return { status: 422, message: error.errmsg ? error.errmsg : error.toString(), data: [], meta: {} };
    }
  }
}