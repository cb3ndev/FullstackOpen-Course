const Header = (props) => {
  return (
      <h1>{props.course}</h1>
  )
}
const Part = (props) => {
  return (
    <p>
      {props.partElement} {props.exerciseElement}
    </p>
  )
}

const Content = (props) => {
  return (
    <>
      <Part partElement={props.partList[0]} exerciseElement={props.exerciseList[0]} />
      <Part partElement={props.partList[1]} exerciseElement={props.exerciseList[1]} />
      <Part partElement={props.partList[2]} exerciseElement={props.exerciseList[2]} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.exerciseList.reduce((previousValue, currentValue) => previousValue + currentValue,0)}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const partList =['Fundamentals of React', 'Using props to pass data', 'State of a component']
  const exerciseList = [10, 7, 14]
  return (
    <div>
      <Header course={course} />
      <Content  partList={partList} exerciseList={exerciseList} />
      <Total exerciseList={exerciseList} />
      
    </div>
  )
}

export default App