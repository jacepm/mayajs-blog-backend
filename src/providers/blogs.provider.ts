import { Connection } from 'mongoose';
import { BlogSchema } from 'src/schemas/blog.schema';

export const blogsProvider = [
  {
    provide: 'BLOG_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Blogs', BlogSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
