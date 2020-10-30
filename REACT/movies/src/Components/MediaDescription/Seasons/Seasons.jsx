import React, { useState, useEffect } from 'react'
import { useSearch } from '../../../Utils/hooks/useSearch';
import EpisodeCard from './EpisodeCard';
import classes from './Seasons.module.css'

const createOptions = (num) => {
    const optionsArr = []

    for (let i = 1; i <= num; i++) {
        optionsArr.push(<option key={i} value={i} >Temporada {i}</option>)
    }

    return optionsArr
}

const Seasons = ({ seasonsNum, media, id }) => {

    const [seasons, setSeasons] = useState('season/1');
    const [options, setOptions] = useState([]);
    useEffect(() => {
        setOptions(createOptions(seasonsNum));
    }, [seasonsNum])



    const [data] = useSearch(media, id, 1, seasons);


    return (
        <div>
            <div className={classes.selectContainer}>
                <select name="Temporada" className={classes.select}
                    onChange={(e) => {
                        setSeasons(`season/${e.target.value}`)
                    }} >
                    {options}
                </select>
            </div>
            <div className={classes.cardsContainer}>
                {data && data.episodes.map(episode => (

                    <EpisodeCard img={episode.still_path} number={episode.episode_number} name={episode.name} overview={episode.overview} key={episode.id}  />
                ))
                }
            </div>
        </div>
    )
}

export default Seasons