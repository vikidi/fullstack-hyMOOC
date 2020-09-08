import React, { useState } from 'react'
import ReactDOM from 'react-dom'

/* COMPONENTS */

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick} >
      {text}
    </button>
  )
}

const Statistics = ({numbers}) => {
  let arr = [numbers.good, numbers.neutral, numbers.bad]

  if (total(arr) === 0) return ( <p>No feedback given</p> )

  else {
    return (
      <table>
        <StatisticLine  text="Good" number={numbers.good} />
        <StatisticLine  text="Neutral" number={numbers.neutral} />
        <StatisticLine  text="Bad" number={numbers.bad} />
        
        <StatisticLine  text="Total" number={total(arr)} />
        <StatisticLine  text="Average" number={average(numbers)} />
        <StatisticLine  text="Percentage" number={percentage(numbers.good, arr)} postText="%" />
      </table>
    )
  }
}

const StatisticLine  = ({text, number, postText}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{number} {postText}</td>
    </tr>
  )
}

/* FUNCTIONS */

function total(numbers) {
  let total = 0
  numbers.forEach(element => {
    total += element
  })
  return total
}

function average(numbers) {
  return (numbers.good - numbers.bad) / total([numbers.good, numbers.neutral, numbers.bad])
}

function percentage(ref, all) {
  return ref / total(all)
}

/* APP */

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="Give feedback" />

      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />

      <Header text="Statistics" />

      <Statistics numbers={{good: good, neutral: neutral, bad: bad}} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
