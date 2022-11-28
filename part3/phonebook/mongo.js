const mongoose = require('mongoose')

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

if (!password) {
  console.log('Please provide the password as an argument:' )
  console.log('node mongo.js (To show whole phonebook)')
  console.log('node mongo.js <password> <new name> <new number> (To add new person to the phonebook)')
  process.exit(1)
}else if (newName && !newNumber) {
  console.log('Please provide both: the new name and new number.')
  process.exit(1)
}

const url = `mongodb+srv://root:${password}@fullstackopencluster.nu1vvxw.mongodb.net/DatabasePersons?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')
    if (!newName && !newNumber)
    {
      Person.find({}).then(result => {
        console.log("Phonebook:")
        result.forEach(person => {
          console.log(person.name," ",person.number)
        })
        mongoose.connection.close()
      })
    }else {
      const person = new Person({
        name: newName, 
        number: newNumber,
      })
      person.save().then(() => {
        console.log('person saved!')
        return mongoose.connection.close()
      })
    }
  })
  .catch((err) => console.log(err))