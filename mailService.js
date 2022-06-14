const { Email, Attachment } = require('./models/emailModels')
const { sendMail } = require('./helpers')


// a service which listens to database changes
// if detects any email with {sent=false}, it will send an email
// this is done for simulating queueing
// so that the data doesn't get lost in high scales
const init = async () => {
  const i = process.env.INTERVAL || 5000
  console.log(`Mail Service is running every ${i / 1000} seconds...`)

  setInterval(async () => {

    const email = await Email.aggregate([
      { $match: { sent: false } },
      { $sort: { 'date_created': 1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'attachments',
          localField: '_id',
          foreignField: 'email',
          as: 'attachments'
        }
      },
      {
        $lookup: {
          from: 'rooms',
          localField: 'room',
          foreignField: '_id',
          as: 'room'
        }
      }, { $unwind: '$room' }
    ])

    if (email.length > 0) {
      const { to, subject, text, attachments, room } = email[0]
      try {
        await sendMail({ to, subject, text, attachments, from: room.email })
        await Email.updateOne({ _id: email[0]._id }, { sent: true })
      } catch (err) {
        console.log(err)
      }
    } else
      console.log('No emails to send')


  }, i)

}

module.exports = { init }