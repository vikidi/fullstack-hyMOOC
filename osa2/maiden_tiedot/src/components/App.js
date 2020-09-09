import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Header = ({ text }) => <h1>{text}</h1>

const SubHeader = ({ text }) => <h2>{text}</h2>

const Filter = ({preText, value, onChangeHandler}) => {
    return (
        <>
            {preText} <input value={value} onChange={onChangeHandler} />
        </>
    )
}

const Countries = ({ countries, clickHandler }) => {
    let count = countries.length

    if (count === 0) {
        return null
    }
    else if (count === 1) {
        return ( <CountryInfo country={countries[0]} /> )
    }
    else if (count > 10) {
        return ( <Info text='Too many matches, specify filter more' /> )
    }
    else {
        return countries.map(country => <Country key={country.name} country={country} clickHandler={clickHandler} />)
    }
}

const CountryInfo = ({ country }) => {
    return (
        <>
            <Header text={country.name} />
            
            <Info text={`Capital: ${country.capital}`} />
            <Info text={`Population: ${country.population}`} />

            <SubHeader text='Languages' />

            <StringList list={country.languages.reduce((list, lang) => {
                list.push(lang.name)
                return list
            }, [])} />

            <Image path={country.flag} />

            <SubHeader text={`Weather in ${country.capital}`} />

            <WeatherInfo capital={country.capital} />
        </>
    )
}

const Image = ({path}) => <img alt='' src={path} width="100" height="100" />

const WeatherInfo = ({capital}) => {
    const [ temperature, setTemperature ] = useState('')
    const [ wind, setWind ] = useState('')
    const [ windDir, setWindDir ] = useState('')
    const [ images, setImages ] = useState([])
    
    useEffect(() => {
        axios
        .get('http://api.weatherstack.com/current',
             { params: {
                access_key: process.env.REACT_APP_WEATHER_API_KEY,
                query: capital
             }})
        .then(response => {
            let data = response.data.current
            setTemperature(data.temperature)
            setWind(data.wind_speed)
            setWindDir(data.wind_dir)
            setImages(data.weather_icons)
        })
    }, [capital])
    
    return (
        <div>
            <Info text={`Temperature: ${temperature} Celcius`} />

            {images.map((image, i) => <Image key={i} path={image} />)}

            <Info text={`Wind: ${wind} mph direction ${windDir}`} />
        </div>
    )
}

const StringList = ({ list }) => <ul>{list.map(item => <li key={item}>{item}</li>)}</ul>

const Country = ({ country, clickHandler }) => {
    return (
        <div>
            {country.name}
            <button onClick={() => clickHandler(country.name)}>Show</button>
        </div>
    )
}

const Info = ({ text }) => <p>{text}</p>

const App = () => {
    const [ countries, setCountries ] = useState([])

    const [ countryFilter, setCountryFilter ] = useState('')

    const handleFilterChange = (event) => {
        setCountryFilter(event.target.value)
    }

    const handleCountryClick = (name) => {
        setCountryFilter(name)
    }

    useEffect(() => {
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            setCountries(response.data)
        })
    }, [])

    return (
        <div>
            <Header text='Countries' />

            <Filter preText='Find countries ' value={countryFilter} onChangeHandler={handleFilterChange} />

            <Countries countries={countries.filter(country => country.name.toLowerCase().includes(countryFilter.toLowerCase()))} 
                       clickHandler={handleCountryClick} />
        </div>
    )
}

export default App
