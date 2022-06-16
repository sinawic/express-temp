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
  console.log('sending from:', options.from, 'sending to:', options.to)

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: options.from,
      pass: process.env.SOURCE_PASSWORD
    }
  })

  var mailOptions: IMailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    attachments: []
  }

  if (options.attachments) {
    options.attachments.map(a => {
      mailOptions.attachments?.push({ path: a.path })
    })
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
