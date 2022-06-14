var crypto = require('crypto')
var nodemailer = require('nodemailer')

const connection_string = process.env.DB_CONNECTION_STRING,
  accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

function sha1(val) {
  var shasum = crypto.createHash('sha1')
  shasum.update(val)
  return shasum.digest('hex')
}

// this will try to send an email using node mailer
// with source of the email read from env by default
// and options as passed
function sendMail(options) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: options.from || process.env.SOURCE_EMAIL,
      pass: process.env.SOURCE_PASSWORD
    }
  })

  var mailOptions = {
    from: options.from || process.env.SOURCE_EMAIL,
    to: options.to,
    subject: options.subject,
    text: options.text,
  }

  // add attachments if any
  if (options.attachments && options.attachments.length > 0) {
    mailOptions.attachments = options.attachments.map(attachment => ({ path: attachment.path }))
  }

  return transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error(error)
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}


module.exports = {
  sha1, connection_string, accessTokenSecret, sendMail
}
