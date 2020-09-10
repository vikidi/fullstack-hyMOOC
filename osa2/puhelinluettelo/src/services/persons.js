import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
    const req = axios.get(baseUrl)
    return req.then(response => response.data)
}

const addPerson = (newPerson) => {
    const req = axios.post(baseUrl, newPerson)
    return req.then(response => response.data)
}

export default { getAllPersons, addPerson }
