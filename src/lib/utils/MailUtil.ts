import nodemailer from 'nodemailer';
import EmailTemplates from 'email-templates'
import AWS from 'aws-sdk';
import _ from 'lodash'

const path = require('path');

class MailUtil {
  static async sendMailToEmail(email:string, customLocals:any, template:string) {
    if (!AWS.config.region) {
      AWS.config.update({
        region: 'eu-central-1'
      });
    }

    const locals = {
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
        to: email
      },
      locals
    })
  }
}

export default MailUtil;
