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

const Notification = ({ message, success }) => {
    if (message === null) {
      return null
    }
    
    if (success) {
        return (
            <div className="success">
                {message}
            </div>
        )
    }
    else {
        return (
            <div className="error">
              {message}
            </div>
        )
    }
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

    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

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
                    setSuccess(`Number updated for ${person.name}`)
                })
                .catch(err => {
                    setPersons(persons.filter(p => person.id !== p.id))
                    setError(`${person.name} was not found`)
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
                setSuccess(`${newName} added`)
            })
            .catch(err => {
                setError(err.response.data.error)
            })
        }
    }

    const deletePerson = person => {
        if (window.confirm(`Delete ${person.name}?`)) {
            // Accepted delete
            PersonService
            .deletePerson(person.id)
            .then(response => {
                setSuccess(`${person.name} deleted`)
            })
            .catch(err => {
                setError(`${person.name} has already been deleted`)
            })
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

    const setError = msg => {
        setErrorMessage(msg)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    const setSuccess = msg => {
        setSuccessMessage(msg)
        setTimeout(() => {
            setSuccessMessage(null)
        }, 5000)
    }

    useEffect(() => {
        PersonService
        .getAllPersons()
        .then(response => {
            setPersons(response)
        })
        .catch(err => {
            setError('Error while loading data')
        })
    }, [])

    return (
        <div>
            <Notification message={errorMessage} success={false} />
            <Notification message={successMessage} success={true} />

            <Header text="Phonebook" />

            <Filter preText="Filter names with " value={nameFilter} onChangeHandler={handleFilterChange} /> 

            <Header text="Add new number" />

            <PersonForm name={newName} 
                        number={newNumber}
                        nameChangeHandler={handleNameChange}
                        numberChangeHandler={handleNumberChange}
                        submitHandler={addPerson} />

            <Header text="Numbers" />
            
            <Numbers numbers={persons.filter(num => num.name.toLowerCase().includes(nameFilter.toLowerCase()))} 
                     deleteClickHandler={deletePerson} />

        </div>
    )

}

export default App