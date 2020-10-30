import React from 'react'
import { BsStarFill } from 'react-icons/bs';
import { BsStarHalf } from 'react-icons/bs';
import { BsStar } from 'react-icons/bs';
import classes from './Stars.module.css'

const ICONS = [<BsStarFill />, <BsStarHalf />, <BsStar />]

const renderIcons = (number) => {
    let icons
    const totalIcons = 5

    const isOdd = number % 2;
    const fullIcons = (number - isOdd) / 2
    const fullIconsArr = number && [...new Array(fullIcons)].map(() => ICONS[0])
    const halfIcons = isOdd ? ICONS[1] : null;
    console.log({ totalIcons, fullIconsArr, icons, isOdd, fullIcons, number })
    const emptyIconsArr = [...new Array(totalIcons - fullIcons - isOdd)].map(() => ICONS[2])
    icons = (number === 0) ? [...emptyIconsArr] : [...fullIconsArr, halfIcons, ...emptyIconsArr]

    return icons
}

const Stars = ({ number }) => {

    return (

        <div className={classes.container}>
            {renderIcons((number))}
        </div>
    )

}

export default Stars;
