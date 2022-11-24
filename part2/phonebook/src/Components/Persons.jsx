const Persons = ({arrayPersons}) => {
  return (
    <>
  		{arrayPersons.map(person => <div key={person.name}> {person.name} {person.number} </div> )}
    </>
  )
}
  
export default Persons