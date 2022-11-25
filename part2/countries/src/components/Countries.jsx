import { useState } from 'react'
import SingleCountry from './SingleCountry'

const Countries = ({array}) => {
  const [clickedCountry, setClickedCountry] = useState({})

  if (Object.keys(clickedCountry).length === 0)
  {
    return (
      <>
        {array.map(country =>
          <div key={country.name.common}>
            <span> {country.name.common} </span>
            <button onClick={()=>setClickedCountry(country)}> show </button>      
          </div>
        )}
      </>
    )
  }else{
    return(<SingleCountry countryobject={clickedCountry} />)
  }
	
}
  
export default Countries