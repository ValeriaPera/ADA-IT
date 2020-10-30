import React from 'react'
import { useParams } from 'react-router-dom';
import Card from '../Card/Card';
import Loader from 'react-loader-spinner';
import { useTitle } from "../../Utils/hooks/useTitle";
import { useSearch } from '../../Utils/hooks/useSearch';
import classes from './CategoryPage.module.css'
import Paginator from '../Navigation/Paginator/Paginator';

const CategoryPage = () => {

    const { media, query, page } = useParams()
    const title = useTitle(media, query);
    const [data, isLoading, isError] = useSearch(media, query, page);


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
                <div className={classes.container}>
                    <h2 className={classes.title}>{title}</h2>
                    <div className={classes.cardsContainer}>
                        {data.results.map(movie => (
                            <Card
                                media={media === "multi" ? movie.media_type : media}
                                img={movie.poster_path ? movie.poster_path : movie.profile_path}
                                name={movie.original_title ? movie.original_title : movie.name}
                                id={movie.id} />))}
                    </div>
                    <Paginator url={`${media}/${query}/page/`} page={page} totalPage={data.total_pages} />
                </div>
            )}

        </>
    )

}

export default CategoryPage
