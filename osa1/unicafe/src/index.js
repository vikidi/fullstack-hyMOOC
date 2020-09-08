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

const Stats = ({text, number, postText}) => <p>{text} {number} {postText}</p>

/* FUNCTIONS */

function total(numbers) {
  let total = 0
  numbers.forEach(element => {
    total += element
  })
  return total
}

function average(numbers) {
  let tot = total([numbers.good, numbers.neutral, numbers.bad])
  if (tot === 0) return 0;
  return (numbers.good - numbers.bad) / total([numbers.good, numbers.neutral, numbers.bad])
}

function percentage(ref, all) {
  if (total(all) === 0) return 0
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

      <Stats text="Good" number={good} />
      <Stats text="Neutral" number={neutral} />
      <Stats text="Bad" number={bad} />
      
      <Stats text="Total" number={total([good, neutral, bad])} />
      <Stats text="Average" number={average({good: good, neutral: neutral, bad: bad})} />
      <Stats text="Percentage" number={percentage(good, [good, neutral, bad])} postText="%" />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
