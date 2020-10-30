import React from 'react'
import CategoryPreview from '../../Components/CategoryPreview/CategoryPreview'
import classes from './Tv.module.css'

const Tv = () => {
    return (
        <div className={classes.container}>
            <CategoryPreview media="tv" category="popular" />
            <CategoryPreview media="tv" category="top_rated" />
            <CategoryPreview media="tv" category="on_the_air" />
        </div>
    )

}

export default Tv
