import { useState } from 'react'

const Button = ({event, text}) => {
  return (
    <button onClick={event}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState("")

  
  const setSelectedRandom = () =>{
    // get a random number and save it in the state "selected"
    const randonNumber= Math.floor(Math.random() * anecdotes.length);
    setSelected(randonNumber)
  }

  const handlePoints = (selected) =>{
    // add one point por vote in the selected anecdote and
    // save it in the array for points (state "points")
    const newPoints=[...points]
    newPoints[selected] += 1
    setPoints(newPoints)
    // Get the position of the most voted anecdote and
    // save it in the state "mostVotedAnecdote".
    let positionMostVoted=newPoints.indexOf(Math.max(...newPoints))
    setMostVotedAnecdote(anecdotes[positionMostVoted])
  }

  return (
    <>
      <h1>Anecdote of the Day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <div>has {points[selected]} votes</div>
      <Button event={() => handlePoints(selected)} text="Vote" /> 
      <Button event={() => setSelectedRandom(selected)} text="Next Anecdote" /> 

      <h1>Anecdote with the most votes</h1>
      <div>
        {mostVotedAnecdote}
      </div>
    </>
  )
}

export default App
