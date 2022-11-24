import SinglePerson from "./SinglePerson"

const Persons = ({arrayPersons}) => {
  return (
    <>
  		{arrayPersons.map(person => <SinglePerson key={person.name} name={person.name} number={person.number} /> )}
    </>
  )
}
  
export default Persons