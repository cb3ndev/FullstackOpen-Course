import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import SingleCountry from './components/SingleCountry'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const filterCountryByName = (event) => {
    const searchedName = event.target.value.toLowerCase()
    const filteredCountriesarray=countries.filter(country => country.name.common.toLowerCase().includes(searchedName))
    setFilteredCountries(filteredCountriesarray)
  }
  

  return (
    <div>
    <Filter onChangefunc={filterCountryByName}/>
    {filteredCountries.length>1 && filteredCountries.length<=10
      ?<Countries array={filteredCountries} />
      : filteredCountries.length===1?<SingleCountry countryobject={filteredCountries[0]} />
      : "Too many matches, specify another filter"}
    </div>
  )
}

export default App
