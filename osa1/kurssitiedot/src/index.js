import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  const listItems = props.parts.map((part) =>
    <p>
      {part.part} {part.exercises}
    </p>
  );

  return (
    <>
      {listItems}
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.numbers.reduce((result,number)=> result+number)}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content parts={[{part: part1, exercises: exercises1},
                      {part: part2, exercises: exercises2},
                      {part: part3, exercises: exercises3}]} />
      <Total numbers={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
