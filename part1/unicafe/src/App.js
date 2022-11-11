import { useState } from 'react'

const Button = ({event, text}) => {
  return (
    <button onClick={event}>{text}</button>
  )
}

const StatisticLine  = ({text, value, units}) => {
  return (
    <tr>
      <td>{text} </td>
      <td>{value} {units}</td>    
    </tr>
  )
}

const Statistics = ({title, goodValue, neutralValue, badValue}) => {
  let all = (goodValue + neutralValue + badValue)
  let average = (goodValue- badValue)/all
  let positive = (goodValue * 100) / all
  if(all>0){
    return(
    <div>
      <h1>{title}</h1>
      <table>
        <tbody>
          <StatisticLine  text="good" value={goodValue} />
          <StatisticLine  text="neutral" value={neutralValue} />
          <StatisticLine  text="bad" value={badValue} />
          <StatisticLine  text="all" value={all} />
          <StatisticLine  text="average" value={average} />
          <StatisticLine  text="positive" value={positive} units={"%"} />
        </tbody>
      </table>
    </div>)
  } else {
    return(
      <div>
        <h1>{title}</h1>
        <div>No feedback given</div>
      </div>
    )
  }
}

const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button event={() => setGood(good+1)} text="good"/>
      <Button event={() => setNeutral(neutral+1)} text="neutral"/>
      <Button event={() => setBad(bad+1)} text="bad"/>
      <Statistics title="Statistics" goodValue={good} neutralValue={neutral} badValue={bad}/>  
    </div>
  )
}

export default App