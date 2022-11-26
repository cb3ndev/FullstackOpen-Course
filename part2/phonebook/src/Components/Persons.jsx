import SinglePerson from "./SinglePerson"

const Persons = ({arrayPersons, deleteFunc}) => {
  return (
    <>
  		{arrayPersons.map(person => 
        <div key={person.name}>
          <SinglePerson name={person.name} number={person.number} />
          <button onClick={()=>deleteFunc(person.id, person.name)}> delete </button>
        </div>
      )}
    </>
  )
}
  
export default Persons