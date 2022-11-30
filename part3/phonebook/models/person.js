const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')  })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message)
    }
  )

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        const test = /^\d{2,3}-\d{6,}$/.test(v) //"^" & "$" match whole number 
        return test;
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true
  }
})

// const noteSchema = new mongoose.Schema({
//   content: {
//     type: String,
//     minLength: 5,
//     required: true
//   },
//   date: {
//     type: Date,
//     required: true
//   },
//   important: Boolean
// })

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)