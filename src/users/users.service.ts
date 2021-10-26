import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { IUser } from 'src/interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private model: Model<IUser>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, confirmPassword } = createUserDto;

    if (password !== confirmPassword) {
      const message = "Password and Confirm Password didn't matched!";
      throw new UnprocessableEntityException(message);
    }

    let user: IUser;

    try {
      user = await this.model.create(createUserDto);
    } catch (error) {
      return { message: error.errmsg ? error.errmsg : error.toString() };
    }

    user.setPassword(password);

    try {
      const result = JSON.parse(JSON.stringify(await user.save()));
      delete result.password;
      return { message: 'User was successfully added.', data: result };
    } catch (error) {
      await this.model.findOneAndDelete({ _id: user.id });
      return { message: error.errmsg ? error.errmsg : error.toString() };
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { userName, password } = loginUserDto;
    let user: IUser;

    try {
      user = await this.model.findOne({ userName: userName });
      if (!user || !user.comparePassword(password)) {
        const message = 'Invalid username and password!';
        throw new UnprocessableEntityException(message);
      }
      const result: IUser = JSON.parse(JSON.stringify(user));
      delete result.password;
      const message = `${result.userName} was successfully logged in.`;
      return { message, data: result };
    } catch (error) {
      return error.response
        ? { ...error.response }
        : { message: error.errmsg ? error.errmsg : error.toString() };
    }
  }

  async findAll() {
    try {
      const result = await this.model.find({ deleted: false });
      return { message: 'Users successfully fetched.', data: result };
    } catch (error) {
      return { message: error.errmsg ? error.errmsg : error.toString() };
    }
  }

  async findById(id: string) {
    try {
      const result = await this.model.findById(id);
      return { message: 'User successfully fetched.', data: result };
    } catch (error) {
      return { message: error.errmsg ? error.errmsg : error.toString() };
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const result = await this.model.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });
      return { message: 'User was successfully updated.', data: result };
    } catch (error) {
      return { message: error.errmsg ? error.errmsg : error.toString() };
    }
  }

  async remove(id: string) {
    try {
      await this.model.findByIdAndUpdate(id, { deleted: true });
      return { message: 'User was successfully deleted.', data: [] };
    } catch (error) {
      return { message: error.errmsg ? error.errmsg : error.toString() };
    }
  }
}
