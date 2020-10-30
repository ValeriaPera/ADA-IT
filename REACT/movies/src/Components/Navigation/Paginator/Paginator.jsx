import React from 'react'
import classes from './Paginator.module.css'
import { Link } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

const getItems = (current, totalPage, getUrl) => {
    const offset = 2;
    const aux = [];

    let upperLimit = totalPage - offset > current ? current + offset : totalPage;

    let lowerLimit = current - offset > 0 ? current - offset : 1;

    if (upperLimit - current - offset < 0) {
        lowerLimit -= current + offset - upperLimit;
    }

    if (current - lowerLimit - offset < 0) {
        upperLimit += lowerLimit + offset - current;
    }

    for (let indice = lowerLimit; indice <= upperLimit; indice++) {
        aux.push(<Link className={current === indice ? classes.current : classes.link} to={getUrl(indice)}>{indice}</Link>);
    }

    return aux;
};

const Paginator = ({ url, page, totalPage }) => {
    if(totalPage <= 1){
        return null
    }
    const getUrl = (numPage) => {
        return `/${url}${numPage}`;
    };

    const before = page > 1 ? getUrl(Number(page) - 1) : null;
    const next = page < totalPage ? getUrl(Number(page) + 1) : null;

    const items = getItems(Number(page), totalPage, getUrl);

    return (
        <div className={classes.container}>
            {before && <Link to={before} className={classes.link}><AiOutlineArrowLeft/></Link>}
            <div className={classes.linksContainer}>{items}</div>
            {next && <Link className={classes.link} to={next}><AiOutlineArrowRight/></Link>}
        </div>
    );
};

export default Paginator