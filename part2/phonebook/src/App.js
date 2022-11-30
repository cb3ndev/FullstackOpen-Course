import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import personService from './Services/persons'
import Notification from './Components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [succcesMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
        setFilteredPersons(response)
      })
      .catch(error=>console.log(error.message))
  }, [])

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const addName = (event) => {
    event.preventDefault()
    const ifExistArray= persons.filter(person => person.name === newName)
    
    const notePerson = {
      name: newName,
      number: newNumber,
    }

    if (ifExistArray.length!==0){
      //alert(`${newName} is already added to phonebook`)
      //console.log(ifExistArray[0])
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        personService
        .update(ifExistArray[0].id, notePerson)
        .then(response => {
          setPersons(persons.map(person => person.id !== ifExistArray[0].id ? person : response))
          setFilteredPersons(persons.map(person => person.id !== ifExistArray[0].id ? person : response))
          //succes message  
          setSuccessMessage(`Updated ${notePerson.name} `)
          setTimeout(() => {setSuccessMessage(null)}, 3000)
          })
        .catch(error => {
          console.log(error.response.data.error)
          if (error.response.data.error === 'element to update not found'){
            setErrorMessage(`Information of ${newName} has already been removed from server!`)
            setTimeout(() => {setErrorMessage(null)}, 3000)
            setPersons(persons.filter(n => n.id !== ifExistArray[0].id))
            setFilteredPersons(persons.filter(n => n.id !== ifExistArray[0].id))
          } else {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {setErrorMessage(null)}, 3000)
          }
          
          })
      }
    } else {
      personService
        .create(notePerson)
        .then(response => {
          setPersons(persons.concat(response))
          setFilteredPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          //succes message  
          setSuccessMessage(`Added ${notePerson.name} `)
          setTimeout(() => {setSuccessMessage(null)}, 3000)
        })
        .catch(error=> {
          console.log(error.response.data.error)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {setErrorMessage(null)}, 3000)
        })
      
    }
  }

  const deleteName = (id, name) => {  
    if (window.confirm(`Delete ${name} ?`)) {
      personService
      .deletes(id)
      .then((response) => {
        setPersons(persons.filter(person => person.id !== id))
        setFilteredPersons(persons.filter(person => person.id !== id))
        console.log("person deleted, status:", response.status)
      })  
      .catch(error=>console.log(error.message)) 
    }
  }

  const filterPersonsByName = (event) => {
    const searchedName = event.target.value.toLowerCase()
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(searchedName)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification  className='success' message={succcesMessage}/>
      <Notification  className='error' message={errorMessage}/>
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
      <Persons arrayPersons={filteredPersons} deleteFunc={deleteName}/>
    </div>
  )
}

export default App
