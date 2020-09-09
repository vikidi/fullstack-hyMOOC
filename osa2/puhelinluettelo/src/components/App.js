import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
    const [ persons, setPersons ] = useState([])

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

    useEffect(() => {
        axios
        .get('http://localhost:3001/persons')
        .then(response => {
            setPersons(response.data)
        })
    }, [])

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