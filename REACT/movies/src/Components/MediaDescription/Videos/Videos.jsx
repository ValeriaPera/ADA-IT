import React from 'react'
import { useSearch } from '../../../Utils/hooks/useSearch';
import classes from './Videos.module.css'
import Loader from 'react-loader-spinner';

const Videos = ({ media, id }) => {

    const [data, isLoading, isError] = useSearch(media, id, 1, "videos");

    console.log("videos", data)

    return (
        <>
            {isError && (
                <div className="alert-danger" role="alert">
                    Error 404: Not Found.
                    API error: There was an error please refresh the page and try again.
                </div>
            )}

            {isLoading && (
                <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
            )}

            {data && !isError && !isLoading && (
                <div className={classes.videoContainer}>
                    {(data.results.length === 0) && <h1 className={classes.title}>No se encontraron videos</h1>}

                    {data.results.map(video => (
                        <iframe className={classes.video}
                            src={`https://www.youtube.com/embed/${video.key}`} title={video.key}>
                        </iframe>
                    ))}
                </div>
            )}
        </>
    )
}

export default Videos
