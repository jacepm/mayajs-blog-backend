import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IBlog } from 'src/interfaces';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @Inject('BLOG_MODEL')
    private model: Model<IBlog>,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    try {
      const result = await this.model.create(createBlogDto);
      return { message: 'Blog was successfully added.', data: result };
    } catch (error) {
      return { message: error.errmsg ? error.errmsg : error.toString() };
    }
  }

  async findAll() {
    try {
      const result = await this.model.find({ deleted: false });
      return { message: 'Blogs successfully fetched.', data: result };
    } catch (error) {
      return { message: error.errmsg ? error.errmsg : error.toString() };
    }
  }

  async findById(id: string) {
    try {
      const result = await this.model.findById(id);
      return { message: 'Blog successfully fetched.', data: result };
    } catch (error) {
      return { message: error.errmsg ? error.errmsg : error.toString() };
    }
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    try {
      const result = await this.model.findByIdAndUpdate(id, updateBlogDto, {
        new: true,
      });
      return { message: 'Blog was successfully updated.', data: result };
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
