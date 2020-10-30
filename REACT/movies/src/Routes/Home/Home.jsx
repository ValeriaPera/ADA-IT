import React from 'react'
import classes from './Home.module.css'
import CategoryPreview from '../../Components/CategoryPreview/CategoryPreview'

const Home = () => {

    return (
        <div className={classes.container}>
            <CategoryPreview media="movie" category="trending" />
            <CategoryPreview media="tv" category="trending" />
        </div>
    )
}

export default Home
