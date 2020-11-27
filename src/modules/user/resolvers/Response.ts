import { User } from 'models/User';

export const UserResponse: any = {
  id: (doc: User) => doc._id,
};
