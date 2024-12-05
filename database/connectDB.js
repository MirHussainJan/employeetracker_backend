const mongoose = require('mongoose')
const connect = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    console.log(`Database is connected on : ${mongoose.connection.host.blue}`)
}

module.exports = connect