import { useState, useEffect } from 'react'
import axios from 'axios'


const SingleCountry = ({countryobject}) => {
  const apikey =  process.env.REACT_APP_API_KEY //api key from .env file
  const [weatherData, setWeatherData] = useState({})
  const apiURL =  `https://api.openweathermap.org/data/2.5/weather?lat=${countryobject.capitalInfo.latlng[0]}&lon=${countryobject.capitalInfo.latlng[1]}&units=metric&appid=${apikey}`
  useEffect(() => {
    axios
      .get(apiURL)
      .then(response => {
        setWeatherData(response.data)
        //setFilteredCountries(response.data)
      })
  }, [apiURL])
	return (
    <div>
      <h2>{countryobject.name.common}</h2>
      <div>capital {countryobject.capital[0]}</div>
      <div>area {countryobject.area}</div>
      <h4>Languages</h4>
      <ul>
        {Object.values(countryobject.languages).map(value => ( 
          <li key={value}>{value}</li>      
        ))}
      </ul>
      <img alt="flag" src={countryobject.flags.png}/>
      <h3>Weather in {countryobject.capital[0]}</h3>
      {weatherData.main && <div>temperature {weatherData.main.temp} Celsius</div>}
      {weatherData.main && <img alt="flag" src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>}
      {weatherData.main && <div>wind {weatherData.wind.speed} m/s</div>}
    </div>
  )
}
export default SingleCountry