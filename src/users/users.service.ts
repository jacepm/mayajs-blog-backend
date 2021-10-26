import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUser } from 'src/interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private model: Model<IUser>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const result = await this.model.create(createUserDto);
      return { message: 'User was successfully added.', data: result };
    } catch (error) {
      return { message: error.errmsg ? error.errmsg : error.toString() };
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
