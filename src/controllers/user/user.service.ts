import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";

@Injectable()
export class UserServices {
  @Models("user") model: any;

  constructor() {}

}