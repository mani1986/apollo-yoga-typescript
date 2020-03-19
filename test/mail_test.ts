import { expect, assert, should } from 'chai';
import mail from '../src/lib/mail'

describe('mail', () => {
  it('should send', async () => {
    const message = mail.getSimpleEmail('hi')
    assert.isFulfilled(mail.send('mandy.harvey@ethereal.email', 'Test', message));
  })
})