import React from 'react'
import CategoryPreview from '../../Components/CategoryPreview/CategoryPreview'
import classes from './Movies.module.css'


const Movies = () => {
    return (
        <div className={classes.container}>
            <CategoryPreview media="movie" category="popular" />
            <CategoryPreview media="movie" category="top_rated" />
            <CategoryPreview media="movie" category="upcoming" />
            <CategoryPreview media="movie" category="now_playing" />
        </div>

    )

}

export default Movies
