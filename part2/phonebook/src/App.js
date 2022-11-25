import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }, [])

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
