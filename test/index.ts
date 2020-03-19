import { expect } from 'chai'
import boot from '../src/boot'
import auth from '../src/lib/auth'
import chaiAsPromised from 'chai-as-promised';
import chai from 'chai'
import UserModel from '../src/models/User';
import TokenModel from '../src/models/Token';

chai.use(chaiAsPromised);

before(async () => {
  await boot.start()

  try {
    await auth.createUser('Test', 'test@test.com', await auth.hashPassword('test'))
  } catch {
  }
})

after(async () => {
  UserModel.deleteMany({}, (err) => console.log(err));
  TokenModel.deleteMany({}, (err) => console.log(err));
})

require('./auth_test')
require('./mail_test')
