import { User } from 'models/User';
import nodemailer from 'nodemailer';
import EmailTemplates from 'email-templates'
import AWS from 'aws-sdk';
import _ from 'lodash'

const path = require('path');

class MailUtil {
  static async sendPasswordRecovery(user: User) {
    const locals = {
      url: `${process.env.APP_URL}/na/activate/${user.passwordResetToken}`
    }

    await MailUtil.sendMailToUser(user, locals, 'passwordRecovery')
  }

  static async sendEmailVerification(user: User, manager:string) {
    const locals = {
      manager,
      url: `${process.env.APP_URL}/na/activate/${user.passwordResetToken}`
    }

    await MailUtil.sendMailToUser(user, locals, 'verifyEmail')
  }

  static async sendUpdate(user: User) {
    const locals = {
      url: `${process.env.APP_URL}`
    }

    await MailUtil.sendMailToUser(user, locals, 'update')
  }

  static async sendMailToUser(toUser:User, customLocals:any, template:string) {
    const locals = {
      name: _.get(toUser, 'profile.fullName'),
      ...customLocals
    }

    const pathToTemplate = path.join(__dirname, '../', '../', 'emails', template)

    let transport = nodemailer.createTransport({
      SES: new AWS.SES({
        apiVersion: '2010-12-01',
      }),
    });

    const mail = new EmailTemplates({
      message: {
        from: process.env.MAIL_FROM_EMAIL
      },
      send: true,
      transport
    })

    await mail.send({
      template: pathToTemplate,
      message: {
        to: toUser.email
      },
      locals
    })
  }
}

export default MailUtil;
