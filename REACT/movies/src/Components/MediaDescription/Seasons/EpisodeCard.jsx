import React from 'react'
import classes from './EpisodeCard.module.css'

const EpisodeCard = ({ img, number, name, overview }) => {
    return (
        <figure className={classes.figure}>
            <img src={`http://image.tmdb.org/t/p/w400${img}`} className={classes.img} alt="img" />
            <figcaption>
                <span className={classes.number}>EP{(0 < number < 10) ? `0${number}` : number}</span>
                <span className={classes.title}>{name}</span >
                <p className={classes.overview}>{overview}</p>
            </figcaption>
        </figure >
    )
}

export default EpisodeCard
