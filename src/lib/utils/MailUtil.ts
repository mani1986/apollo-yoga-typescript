import nodemailer from "nodemailer";
import EmailTemplates from "email-templates";
import AWS from "aws-sdk";
import _ from "lodash";

const path = require("path");

class MailUtil {
  static async text(message: string) {
    var params: any = {
      Message: message,
      PhoneNumber: "+31646801898",
      MessageAttributes: {
        "AWS.SNS.SMS.SenderID": {
          DataType: "String",
          StringValue: "MONKEYPS5",
        },
      },
    };

    let publishTextPromise: any = new AWS.SNS({ apiVersion: "2010-03-31" })
      .publish(params)
      .promise();

    publishTextPromise
      .then(function (data: any) {
        // res.end(JSON.stringify({ MessageID: data.MessageId }));
        console.log(data)
      })
      .catch(function (err: any) {
        console.error(err)
      });
  }

  static async sendMailToEmail(
    email: string,
    customLocals: any,
    template: string
  ) {
    if (!AWS.config.region) {
      AWS.config.update({
        region: "eu-central-1",
      });
    }

    const locals = {
      ...customLocals,
    };

    const pathToTemplate = path.join(
      __dirname,
      "../",
      "../",
      "emails",
      template
    );

    let transport = nodemailer.createTransport({
      SES: new AWS.SES({
        apiVersion: "2010-12-01",
      }),
    });

    const mail = new EmailTemplates({
      message: {
        from: process.env.MAIL_FROM_EMAIL,
      },
      send: true,
      transport,
    });

    await mail.send({
      template: pathToTemplate,
      message: {
        to: email,
      },
      locals,
    });
  }
}

export default MailUtil;
