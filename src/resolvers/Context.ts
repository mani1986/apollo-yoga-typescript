import { UserDocument } from '../models/User';

interface Context {
  user: UserDocument,
  accessToken: string,
  db: object
}

export default Context;
