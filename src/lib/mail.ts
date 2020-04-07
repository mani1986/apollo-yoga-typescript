import nodemailer from 'nodemailer';

const config = {
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
};
const transporter = nodemailer.createTransport(config);

class mail {
  static async send(to:string, subject:string, html:string) {
    let info = await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME} " <${process.env.MAIL_FROM_EMAIL}>`,
      to,
      subject,
      html
    });

    return info;
  }

  static getSimpleEmail(text:string) {
    return `
      <div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px;
      ">
        <h2>Important Message</h2>
        <p>${text}</p>
        <p>Nobli</p>
      </div>
  `;
  }
}

export default mail;
