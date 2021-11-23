import React,{Fragment, useContext,useState} from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from './Cart.module.css';
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
const Cart = props =>{
    const[showForm,setShowForm]=useState(false);
    const[isSubmitting,setIsSubmitting]=useState(false);
    const[didSubmitted,setDidSubmitted]=useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount =`$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems =cartCtx.items.length>0;

    const cartItemAddHandler =item=>{
        cartCtx.addItem({...item,amount:1})
    };
    const cartItemRemoveHandler =id=>{
        cartCtx.removeItem(id)
    };

    const orderHandler=()=>{
        setShowForm(true);
    };
    async function submitOrderFormObject(formObject){
        const response=await fetch('https://fetchingapi-6c12f-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body:JSON.stringify({
                user:formObject,
                orderedItems:cartCtx.items
            }),
            headers:{'Content-Type':'application/json'}
        })
        const data=await response.json();
        console.log(data)

        setDidSubmitted(true);
        cartCtx.clearCart();
    }

    const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map(item => 
        <CartItem  key={item.id} name={item.name} price={item.price} amount={item.amount} onAdd={cartItemAddHandler.bind(null,item)} onRemove={cartItemRemoveHandler.bind(null,item.id)} />)}</ul>;
    
    const modalAction=<div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasItems&&<button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>     



    const cartModalContent=(
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {showForm && <Checkout onRecieveFormObject={submitOrderFormObject} onClick={props.onHideCart}/>}
            {!showForm && modalAction}
        </Fragment>);
    const isSubmittingModal=<p>sending order data ...</p>;
    const didSubmittedModal=(
        <Fragment>
            <p>order is submitted successfully ...</p>
            <div className={classes.actions}>
                 <button className={classes.button} onClick={props.onHideCart}>Close</button>
            </div> 
        </Fragment>);
    return(
    <Modal onCloseCart={props.onHideCart}>
        {!isSubmitting && !didSubmitted && cartModalContent}
        {isSubmitting &&  isSubmittingModal}
        {!isSubmitting && didSubmitted && didSubmittedModal}
    </Modal>
    )
}
export default Cart;