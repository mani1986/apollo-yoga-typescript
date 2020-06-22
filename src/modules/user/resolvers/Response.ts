import { UserDocument } from 'models/User';

export const UserResponse: any = {
  id: (doc: UserDocument) => doc._id,
  email: (doc: UserDocument) => doc.email,
  role: (doc: UserDocument) => doc.role,
  profile: (doc: UserDocument) => doc.profile,
};
