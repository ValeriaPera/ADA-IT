import React from 'react'
import { Switch, Route, useParams, NavLink } from 'react-router-dom'
import classes from './MediaDescription.module.css'
import { useSearch } from '../../Utils/hooks/useSearch'
import Info from './Info/Info'
import Cast from './Cast/Cast'
import Similar from './Similar/Similar'
import Videos from './Videos/Videos'
import Seasons from './Seasons/Seasons'


const MediaDescription = () => {

    const { media, id } = useParams()

    const [data] = useSearch(media, id);


    return (
        <div>
            {data && (
                <div className={classes.container}>
                    <div className={classes.imgContainer}>
                        <div className={classes.imgShadow}></div>
                        <div style={{ background: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center center' }} className={classes.img}></div>
                    </div>

                    <div className={classes.linkContainer}>
                        <NavLink
                            activeStyle={{
                                borderBottom: "2px solid #fff",
                                paddingBottom: "1rem"
                            }}
                            to={`/${media}/${id}/info`}
                            className={classes.link}
                        >
                                INFO
                        </NavLink>
                        <NavLink
                            activeStyle={{
                                borderBottom: "2px solid #fff",
                                paddingBottom: "1rem"
                            }}
                            to={`/${media}/${id}/cast`}
                            className={classes.link}
                        >
                            REPARTO
                        </NavLink>
                        {(media === 'movie')
                            ? 
                            <NavLink
                                activeStyle={{
                                    borderBottom: "2px solid #fff",
                                    paddingBottom: "1rem"
                                }}
                                to={`/${media}/${id}/videos`}
                                className={classes.link}
                            >
                                VIDEOS
                            </NavLink>
                            : 
                            <NavLink
                                activeStyle={{
                                    borderBottom: "2px solid #fff",
                                    paddingBottom: "1rem"
                                }}
                                to={`/${media}/${id}/seasons`}
                                className={classes.link}
                            >
                                TEMPORADAS
                            </NavLink>
                        }
                        <NavLink
                            activeStyle={{
                                borderBottom: "2px solid #fff",
                                paddingBottom: "1rem"
                            }}
                            to={`/${media}/${id}/similar`}
                            className={classes.link}
                        >
                            SIMILARES
                        </NavLink>
                    </div>

                    <Switch>
                        <Route exact path={`/${media}/${id}/info`}><Info data={data} media={media} /></Route>
                        <Route exact path={`/${media}/${id}/cast`}><Cast data={data} media={media} id={id} /></Route>
                        {(media === 'movie')
                            ? <Route exact path={`/${media}/${id}/videos`}><Videos data={data} media={media} id={id} /></Route>
                            : <Route exact path={`/${media}/${id}/seasons`}><Seasons seasonsNum={data.number_of_seasons} media={media} id={id} /></Route>
                        }
                        <Route exact path={`/${media}/${id}/similar`}><Similar data={data} media={media} id={id} /></Route>

                    </Switch>
                </div>
            )}

        </div>
    )
}

export default MediaDescription
