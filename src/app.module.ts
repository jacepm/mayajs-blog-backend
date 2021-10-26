import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [UsersModule, BlogsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
