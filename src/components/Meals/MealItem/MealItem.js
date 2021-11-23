import React,{useContext} from "react";
import classes from './MealItem.module.css'
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
const MealItem = props =>{

    const price=`$${props.price.toFixed(2)}`;
    const cartCtx=useContext(CartContext);

    const addToCardHandler = (amount) =>{
        cartCtx.addItem({
            amount:amount,
            price:props.price,
            id:props.id,
            name:props.name
        })
        console.log(amount)
    };

    return(
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>    
            <div>
                <MealItemForm  onAddToCard={addToCardHandler} id={props.id}/>
            </div> 
        </li>
    );
};
export default MealItem