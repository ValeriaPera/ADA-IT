import React, { useState } from 'react'
import classes from './Search.module.css'
import { useHistory } from "react-router-dom";


const Search = () => {

    const [value, setValue] = useState("")
    let history = useHistory()

    const handleSearch = (e) => {
        e.preventDefault()
        console.log(value)
        history.push(`/multi/${value}/page/1`)
        setValue("")
    }

    return (
        <form action="" onSubmit={(e) => handleSearch(e)} className={classes.container}>

            <svg className={classes.svg} viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" ><circle cx="11" cy="11" r="8"></circle><line x1="21" x2="16.65" y1="21" y2="16.65"></line></svg>

            <input
                className={classes.input}
                type="text"
                placeholder="Búsqueda..."
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />
        </form>

    )
}
export default Search
