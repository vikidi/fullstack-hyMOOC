import React, { useState } from 'react'

const Header = ({text}) => <h2>{text}</h2>

const Numbers = ({numbers}) => {
    return (
        <div>
            {numbers.map(number => <Number key={number.name} number={number} />)}
        </div>
    )
}

const Number = ({number}) => {
    return (
        <p>{number.name}</p>
    )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
      event.preventDefault()

      if (persons.find(elem => elem.name === newName) !== undefined) {
        window.alert(`${newName} is already added to the phonebook!`)
      }
      else {
        setPersons(persons.concat({name: newName}))
        setNewName('')
      }
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  return (
    <div>
        <Header text="Phonebook" />

        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>

        <Header text="Numbers" />
        
        <Numbers numbers={persons} />

    </div>
  )

}

export default App