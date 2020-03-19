import { IUserModel } from '../models/User';

interface Context {
  user: IUserModel,
  token: String,
  db: Object
}

export default Context;
