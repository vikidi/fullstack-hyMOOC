import React, { useState, useEffect } from 'react'
import PersonService from '../services/persons'

const Header = ({text}) => <h2>{text}</h2>

const Numbers = ({numbers, deleteClickHandler}) => {
    return (
        <div>
            {numbers.map(number => <Number key={number.id} number={number} deleteClickHandler={deleteClickHandler} />)}
        </div>
    )
}

const Number = ({number, deleteClickHandler}) => {
    return (
        <div>
            {number.name + ' '}
            {number.number + ' '}
            <button onClick={() => deleteClickHandler(number)}>Delete</button>
        </div>
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

        const person = persons.find(elem => elem.name === newName)
        if (person !== undefined) {
            // Replace
            if (window.confirm(`${newName} is already added to phonebook, relpace the old number with a new one?`)) {
                PersonService
                .updatePerson({...person, number: newNumber})
                .then(response => {
                    setPersons(persons.map(p => p.id !== person.id ? p : response))
                })
                .catch(err => {
                    alert('Error occurred while updating number')
                    setPersons(persons.filter(p => person.id !== p.id))
                })
            }
        }
        else {
            PersonService
            .addPerson({name: newName, number: newNumber})
            .then(response => {
                setPersons(persons.concat(response))
                setNewName('')
                setNewNumber('')
            })
            .catch(err => {
                alert('Error occurred while adding new person')
            })
        }
    }

    const deletePerson = person => {
        if (window.confirm(`Delete ${person.name}?`)) {
            // Accepted delete
            PersonService
            .deletePerson(person.id)
            .finally(() => {
                // Same handling in success and fail
                setPersons(persons.filter(p => person.id !== p.id))
            })
        }
    }

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)

    const handleFilterChange = (event) => {
        setNameFilter(event.target.value)
    }

    useEffect(() => {
        PersonService
        .getAllPersons()
        .then(response => {
            setPersons(response)
        })
        .catch(err => {
            alert('Error occurred while fetching data')
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
            
            <Numbers numbers={persons.filter(num => num.name.toLowerCase().includes(nameFilter))} 
                     deleteClickHandler={deletePerson} />

        </div>
    )

}

export default App