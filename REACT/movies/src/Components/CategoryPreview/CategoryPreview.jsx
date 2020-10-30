import React from 'react'
import { useTitle } from "../../Utils/hooks/useTitle";
import { Link } from 'react-router-dom';
import Preview from '../Preview/Preview';
import classes from './CategoryPreview.module.css'
import { AiOutlineArrowRight } from 'react-icons/ai';


const CategoryPreview = ({ media, category }) => {

    const title = useTitle(media, category);

    return (
        <div className={classes.container}>
            <Link to={`/${media}/${category}/page/1`} className={classes.titleContainer}>
                <p className={classes.title}>{title}</p> 
                <AiOutlineArrowRight className={classes.icon} />
            </Link>
            <Preview media={media} category={category} />
        </div>
    )
}

export default CategoryPreview
