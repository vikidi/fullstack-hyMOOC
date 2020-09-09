import React from 'react'
import ReactDOM from 'react-dom'

/* FUNCTIONS */



/* COMPONENTS */

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      {props.parts.map((part) => <Part key={part.id} part={part} />)}
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.part.name} {props.part.exercises}</p>
    </>
  )
}

const Total = (props) => {
  let total = 0
  props.parts.forEach(element => {
    total += element.exercises
  });

  return (
    <>
      <p><b>Total number of exercises {total}</b></p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course key={course.id} course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
