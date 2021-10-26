import { Connection } from 'mongoose';
import { UserSchema } from 'src/schemas/user.schema';

export const usersProvider = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Users', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
