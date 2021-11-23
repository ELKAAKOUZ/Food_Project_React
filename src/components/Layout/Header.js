import React,{ Fragment } from 'react';
import classes from './Header.module.css'
import mealsImage from '../../assests/meals.jpg'
import HeaderCartButton from './HeaderCartButton';

const Header = (props) =>{
    return(
        <Fragment>
            <header className={classes.header}>
                <h2>ReactMeals</h2>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt='Header '/>
            </div>
        </Fragment>
    )
};
export default Header;