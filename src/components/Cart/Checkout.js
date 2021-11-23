import React,{useRef,useState} from 'react';
import classes from './Checkout.module.css';


//two helper functions outside the component
const isEmpty = value => value.trim()=='';
const isNotValidPostalCode= value => value.trim().length !==5;

const Checkout= props =>{

    const[formInputValidity,setFormInputValidity]=useState({
        name:true,
        street:true,
        city:true,
        postalcode:true
    });

    const nameInputRef=useRef();
    const streetInputRef=useRef();
    const postalcodeInputRef=useRef();
    const cityInputRef=useRef();

    const formSubmitHandler =(event) =>{
        event.preventDefault();
        const enteredName=nameInputRef.current.value;
        const enteredStreet=streetInputRef.current.value;
        const enteredPostalCode=postalcodeInputRef.current.value;
        const enteredCity=cityInputRef.current.value;

        console.log(enteredName,enteredPostalCode,enteredCity,enteredStreet)

        const enteredNameIsValid=!isEmpty(enteredName);
        const enteredStreetIsValid=!isEmpty(enteredStreet);
        const enteredCityIsValid=!isEmpty(enteredCity);
        const enteredPostalCodeIsValid=!isNotValidPostalCode(enteredPostalCode);

        const formIsValid=enteredNameIsValid && 
        enteredStreetIsValid && 
        enteredCityIsValid &&
        enteredPostalCodeIsValid;
        
        setFormInputValidity({
            name:enteredNameIsValid,
            street:enteredStreetIsValid,
            city:enteredCityIsValid,
            postalcode:enteredPostalCodeIsValid
        })
        props.onRecieveFormObject({
            name:enteredName,
            city:enteredCity,
            postalcode:enteredPostalCode,
            street:enteredStreet
        })
           
    }
    return(
        <form onSubmit={formSubmitHandler} className={classes.form}>
            <div className={`${classes.control} ${!formInputValidity.name?classes.invalid:''}`}>
                <label htmlFor='name'>Name</label>
                <input ref={nameInputRef} type='text' id='name' />
                {!formInputValidity.name && <p>please enter a valid name</p>}
            </div>
            <div className={`${classes.control} ${!formInputValidity.street?classes.invalid:''}`}>
                <label htmlFor='street'>street</label>
                <input ref={streetInputRef} type='text' id='street' />
                {!formInputValidity.street && <p>please enter a valid street</p>}
            </div>
            <div className={`${classes.control} ${!formInputValidity.postalcode?classes.invalid:''}`}>
                <label htmlFor='postalcode'>Postal Code</label>
                <input ref={postalcodeInputRef} type='text' id='postalcode' />
                {!formInputValidity.postalcode && <p>please enter a valid postal code</p>}
            </div>
            <div className={`${classes.control} ${!formInputValidity.city?classes.invalid:''}`}>
                <label htmlFor='city'>City</label>
                <input ref={cityInputRef} type='text' id='city' />
                {!formInputValidity.city && <p>please enter a valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onClick}>Cancel</button>
                <button type='submit'>Confirm</button>
            </div>
        </form>
    )
    
};
export default Checkout;