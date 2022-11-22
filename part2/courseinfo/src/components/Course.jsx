const Header = (props) => {
  return (
    <h2>{props.course}</h2>
  )
}
const Part = ({partElement, exerciseElement}) => {
  return (
    <p>
      {partElement} {exerciseElement}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part => 
        <Part key={part.id} partElement={part.name} exerciseElement={part.exercises} />
      )}
    </>
  )
}

const Total = ({parts}) => {
  return (
    <>
      <b>Total of {parts.reduce((initialValue, part) => (initialValue + part.exercises), 0)} exercises</b>
    </>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}
export default Course