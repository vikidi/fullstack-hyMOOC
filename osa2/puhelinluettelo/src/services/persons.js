import axios from 'axios'
const baseUrl = '/api/persons'

const getAllPersons = () => {
    const req = axios.get(baseUrl)
    return req.then(response => response.data)
}

const addPerson = newPerson => {
    const req = axios.post(baseUrl, newPerson)
    return req.then(response => response.data)
}

const deletePerson = id => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(response => response.data)
}

const updatePerson = newPerson => {
    const req = axios.put(`${baseUrl}/${newPerson.id}`, newPerson)
    return req.then(response => response.data)
}

export default { getAllPersons, addPerson, deletePerson, updatePerson }
