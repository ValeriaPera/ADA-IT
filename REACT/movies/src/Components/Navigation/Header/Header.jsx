import React from 'react';
import Nav from '../Nav/Nav';
import Search from '../Search/Search'
import classes from './Header.module.css'

const Header = () => {
    return (
        <header className={classes.container}>
            <Nav />
            <Search />
        </header>
    )
}

export default Header
