import { expect, assert, should } from 'chai';
import moment from 'moment'
import auth from '../src/lib/auth';
import AuthenticationError from '../src/errors/AuthenticationError';
import { User } from '../src/models/User';

describe('login', () => {
  it('should pass correct password', async () => {
    await auth.createUser('Test', '1@test.com', 'test')
    const { user } = await auth.login('1@test.com', 'test')
    expect(user.email).to.eq('1@test.com')
  })

  it('should fail wrong password', async () => {
    await expect(auth.login('test@test.com', 'error')).to.eventually.be.rejectedWith(AuthenticationError);
  })
})

describe('request password reset token', () => {
  it('should not work, wrong email', async () => {
    auth.requestReset('test@test.com')

    const user = await User.findOne({ email: 'test@test.com' })
    console.log(user.passwordResetToken)

    expect(user.passwordResetToken).to.eq(undefined)
    expect(user.passwordResetExpires).to.eq(undefined)
  })

  it('should work, email exists', async () => {
    auth.requestReset('test@test.com')

    const user = await User.findOne({ email: 'test@test.com' })

    expect(user.passwordResetToken.length).to.eq(40)
    expect(moment(user.passwordResetExpires).format('L')).to.eq(moment().format('L'))
  })
})

describe('change password', async () => {
  it('reset invalid, fails', async () => {
    await expect(auth.setPasswordFromToken('gibs', 'hello')).to.eventually.be.rejectedWith(Error);
  })

  it('reset success', async () => {
    const user = await User.findOne({ email: 'test@test.com' })
    const token = await auth.setPasswordFromToken(user.passwordResetToken, 'hello')

    expect(token.length).to.eq(153)
  })
})

describe('set password from token', () => {
  // auth.set
})