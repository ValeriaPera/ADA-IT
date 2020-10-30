import React from 'react'
import SocialMedia from '../../../Components/MediaDescription/Info/SocialMedia/SocialMedia'
import classes from './PersonInfo.module.css'

const PersonInfo = ({ data, media }) => {
    return (
        <div className={classes.container}>
            <img src={`https://image.tmdb.org/t/p/w342${data.profile_path}`} alt="" className={classes.img} />

            <div className={classes.infoContainer}>
                <h1 className={classes.title}>{data.name}</h1>

                <p className={classes.overview}>{data.biography}</p>

                <SocialMedia media={media} id={data.id} homepage={data.homepage} personData={data} />
            </div>
        </div>
    )
}

export default PersonInfo
