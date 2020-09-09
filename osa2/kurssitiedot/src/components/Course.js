import React from 'react'

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

const Total = ({parts}) => {
  const total = parts.reduce((total, part) => total + part.exercises, 0) // Initial value 0 for total

  return (
    <>
      <p><b>Total number of exercises {total}</b></p>
    </>
  )
}

export default Course