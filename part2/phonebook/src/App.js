import { useState } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'

const App = () => {
  const initialstatePersons= [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]
  const [persons, setPersons] = useState(initialstatePersons)
  const [filteredPersons, setFilteredPersons] = useState(initialstatePersons)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const addName = (event) => {
    event.preventDefault()
    const newNameExistArray= persons.some(person => person.name === newName)
    
    if (newNameExistArray){
      alert(`${newName} is already added to phonebook`)
    } else {
      const notePerson = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(notePerson))
      setFilteredPersons(persons.concat(notePerson))  
      setNewName('')
      setNewNumber('')
    }
  }
  const filterPersonsByName = (event) => {
    const searchedName = event.target.value.toLowerCase()
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(searchedName)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChangefunc={filterPersonsByName}/>
      
      <h2>Add a new</h2>
      <PersonForm
        onSubmitFunc={addName}
        onChangeNameFunc={handleNameChange}
        onChangeNumberFunc={handleNumberChange}
        valueName={newName}
        valueNumber={newNumber}      
      />

      <h2>Numbers</h2>
      <Persons arrayPersons={filteredPersons} />
    </div>
  )
}

export default App
