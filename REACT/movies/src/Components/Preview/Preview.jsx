import React from 'react'
import Card from '../Card/Card'
import classes from './Preview.module.css'
import { useSearch } from '../../Utils/hooks/useSearch'
import Loader from 'react-loader-spinner'
import useResize from '../../Utils/hooks/useResize'

const Preview = ({ media, category }) => {

    const [data, isLoading, isError] = useSearch(media, category);

    const [cards] = useResize()

    const moviesSlice = (data && data.results.slice(0, cards))

    return (
        <>
            {isError && (
                <div className="alert-danger" role="alert">
                    Error 404: Not Found.
                    API error: There was an error please refresh the page and try again.
                </div>
            )}

            {
                isLoading && (
                    <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
                )
            }

            {
                data && !isError && !isLoading && (
                    <div className={classes.container}>
                        {
                            moviesSlice && moviesSlice.map(movie => (<Card media={media} img={movie.poster_path} name={movie.title ? movie.title : movie.name} id={movie.id} key={movie.id} />))
                        }
                    </div>
                )}
        </>
    )
}

export default Preview
