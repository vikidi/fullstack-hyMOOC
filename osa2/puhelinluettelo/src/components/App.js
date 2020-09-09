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
        <p>{number.name} {number.number}</p>
    )
}

const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])

    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const [ nameFilter, setNameFilter ] = useState('')

    const addPerson = (event) => {
        event.preventDefault()

        if (persons.find(elem => elem.name === newName) !== undefined) {
        window.alert(`${newName} is already added to the phonebook!`)
        }
        else {
        setPersons(persons.concat({name: newName, number: newNumber}))
        setNewName('')
        setNewNumber('')
        }
    }

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)

    const handleFilterChange = (event) => {
        setNameFilter(event.target.value)
    }

    return (
        <div>
            <Header text="Phonebook" />

            Filter names with <input value={nameFilter} onChange={handleFilterChange} />

            <Header text="Add new number" />

            <form onSubmit={addPerson}>
                <div>
                    Name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    Number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>

            <Header text="Numbers" />
            
            <Numbers numbers={persons.filter(num => num.name.toLowerCase().includes(nameFilter))} />

        </div>
    )

    }

export default App