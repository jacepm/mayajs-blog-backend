import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { DatabaseModule } from 'src/database/database.module';
import { blogsProvider } from 'src/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BlogsController],
  providers: [BlogsService, ...blogsProvider],
})
export class BlogsModule {}
