const { Email, Attachment } = require('./models/models')


const init = async () => {
  const i = process.env.INTERVAL || 5000
  console.log(`Mail Service is running every ${i / 1000} seconds...`)

  setInterval(async () => {

    const email = await Email.aggregate([
      { $match: { sent: false } },
      { $sort: { 'date_created': -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: 'attachments',
          localField: '_id',
          foreignField: 'email',
          as: 'attachments'
        }
      }
    ])

    if (email.length > 0) {
      console.log(email[0]._id)
    } else
      console.log('No emails to send')


  }, i)

}

module.exports = { init }