import { useContext,useEffect,useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  
  const[buttonIsHeighlighted,setButtonIsHeighlighted]=useState(false);
  const cartCtx = useContext(CartContext);
  

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses=`${classes.button} ${buttonIsHeighlighted ? classes.bump : ''}`;
  const {items}=cartCtx;
  
  useEffect(() => {
    if(items.length === 0){
      return;
    };
    setButtonIsHeighlighted(true);
    const timer=setTimeout(()=>{
      setButtonIsHeighlighted(false);
    },300);
    return ()=>{
      clearTimeout(timer);
    };
  },[items]);
  
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
// import React,{Fragment,useContext} from "react";
// import CartContext from "../../store/Cart-Context";
// import CartIcon from "../Cart/CartIcon";
// import classes from './HeaderCartButton.module.css';

// const HeaderCartButton = props =>{ 

//     const cartCtx =useContext(CartContext);
//     const numberOfCartItems=cartCtx.items.reduce((curNumber,item) => {
//         return curNumber + item.amount;
//     },0);
//     return(
//         <Fragment>
//             <button onClick={props.onClick} className={classes.button}>
//                 <span className={classes.icon}><CartIcon/></span>
//                 <span>Your Cart</span>
//                 <span className={classes.badge}>{numberOfCartItems}</span>
//             </button>
//         </Fragment>
//     )
// };
// export default HeaderCartButton;