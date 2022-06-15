import crypto from 'crypto'
import nodemailer from 'nodemailer'
import { unlink } from 'fs'

interface IMailOptions {
  to: string,
  from: string | undefined,
  subject: string,
  text: string,
  attachments?: { path: any; }[]
}

const connection_string = process.env.DB_CONNECTION_STRING,
  accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

function sha1(val: string) {
  var shasum = crypto.createHash('sha1')
  shasum.update(val)
  return shasum.digest('hex')
}

// this will try to send an email using node mailer
// with source of the email read from env by default
// and options as passed
function sendMail(options: IMailOptions) {
  // options.from || 
  console.log('sending with:', process.env.SOURCE_EMAIL, process.env.SOURCE_PASSWORD)

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SOURCE_EMAIL,
      pass: process.env.SOURCE_PASSWORD
    }
  })

  var mailOptions: IMailOptions = {
    from: options.from || process.env.SOURCE_EMAIL,
    to: options.to,
    subject: options.subject,
    text: options.text,
  }

  // add attachments if any
  if (options.attachments && options.attachments.length > 0) {
    mailOptions.attachments = options.attachments.map(attachment => ({ path: attachment.path }))
  }

  return transporter.sendMail(mailOptions, function (error: any, info) {
    if (error) {
      throw new Error(error)
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}

function removeFile(path: String | any) {
  unlink(path, (err) => {
    if (err) console.log(err)
    console.log('successfully deleted ' + path);
  })
}


export {
  sha1, connection_string, accessTokenSecret, sendMail, removeFile
}
