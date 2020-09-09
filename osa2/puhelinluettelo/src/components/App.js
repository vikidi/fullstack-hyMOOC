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

const Filter = ({preText, value, onChangeHandler}) => {
    return (
        <>
            {preText} <input value={value} onChange={onChangeHandler} />
        </>
    )
}

const PersonForm = (props) => {
    return (
        <form onSubmit={props.submitHandler}>
            <div>
                Name: <input value={props.name} onChange={props.nameChangeHandler} />
            </div>
            <div>
                Number: <input value={props.number} onChange={props.numberChangeHandler} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
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

            <Filter preText="Filter names with " value={nameFilter} onChangeHandler={handleFilterChange} /> 

            <Header text="Add new number" />

            <PersonForm name={newName} 
                        number={newNumber}
                        nameChangeHandler={handleNameChange}
                        numberChangeHandler={handleNumberChange}
                        submitHandler={addPerson} />

            <Header text="Numbers" />
            
            <Numbers numbers={persons.filter(num => num.name.toLowerCase().includes(nameFilter))} />

        </div>
    )

}

export default App