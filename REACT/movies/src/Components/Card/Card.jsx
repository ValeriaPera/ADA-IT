import React, { useState } from 'react'
import classes from './Card.module.css'
import { Link } from 'react-router-dom'

const Card = ({ media, img, name, id, width = 'w342', character }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleOnLoad = () => { setIsLoaded(true) }
    const handleOnError = () => {
        setIsLoaded(false)
        setIsError(true)
    }

    return (
        <div className={classes.container}>

            {!isLoaded && !isError&&  <h1>loading...</h1>}
            {isError
                ?
                <Link to={`/${media}/${id}/info`} className={classes.link}>
                    <div className={classes.error}>
                        <svg className={classes.svg} viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" ><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>

                    </div>
                    <p className={classes.title}>
                        {name}
                    </p>
                </Link>
                :
                <Link to={`/${media}/${id}/info`} className={classes.link}>
                    <figure className={classes.figure}>
                        <img
                            src={`http://image.tmdb.org/t/p/${width}${img}`}
                            alt={name} className={classes.img}
                            onLoad={handleOnLoad}
                            onError={handleOnError}
                        />
                        <figcaption className={classes.title}>
                            {name}
                        </figcaption>
                        {(character) && <p className={classes.subtitle}>{character}</p>}
                    </figure>
                </Link>
            }
        </div>
    )
}

export default Card

