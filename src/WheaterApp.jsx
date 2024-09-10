import React, { useState } from 'react'

export const WheaterApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'b77a468f7f997db91ed761fa7c26df5f'
    const difKelvin = 273

    const [city, setCity] = useState('')
    const [dataWheater, setDataWheater] = useState(null)

    const handleSearchCity = (e) => {
        setCity(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (city.length > 0)
            fetchWheater()
    }

    const fetchWheater = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}`)
            const data = await response.json()
            setDataWheater(data)
            console.log(data)
        } catch (error) {
            console.log("An error happened: " + error)
        }
    }

    return (
        <div className='container'>
            <h1> App Wheater</h1>
            <form onSubmit={handleSubmit}>
                <input type='text'
                    value={city}
                    onChange={handleSearchCity}
                ></input>
                <button type='submit'>Search</button>
            </form>
            {
                dataWheater && (
                    <div>
                        <h2>{dataWheater.name}</h2>
                        <p>Temperature: {parseInt(dataWheater?.main?.temp - difKelvin)} C</p>
                        <p>Wheater condition: {dataWheater?.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${dataWheater.weather[0].icon}@2x.png`} />
                    </div>
                )
            }
        </div>
    )
}
