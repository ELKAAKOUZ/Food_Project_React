import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState ={
    items:[],
    totalAmount:0
}
const cartReducer = (state,action) => {
    if(action.type==='ADD'){
        const updatedTotalAmount=state.totalAmount + action.item.amount * action.item.price;

        const existingCartItemIndex=state.items.findIndex(item => item.id===action.item.id);
        const existingCartItem=state.items[existingCartItemIndex];

        // let updatedItem;
        let updatedItems;

        if(existingCartItem){
            const updatedItem={
                ...existingCartItem,
                amount:existingCartItem.amount+action.item.amount
            };

            updatedItems=[...state.items];
            updatedItems[existingCartItemIndex]=updatedItem;


        } else{
            // updatedItem={...action.item};
            updatedItems=state.items.concat(action.item)
            
        };
        
        return(
            {
                items:updatedItems,
                totalAmount:updatedTotalAmount
            }
        );
    }
    if(action.type==='REMOVE'){
        const existingCartItemIndex=state.items.findIndex(item => item.id===action.id);
        const existingCartItem=state.items[existingCartItemIndex];
        let updatedItems;
        const updatedTotalAmount=state.totalAmount-existingCartItem.price;
        if(existingCartItem.amount === 1){
            updatedItems=state.items.filter(item => item.id !== action.id)
        }
        else{
            const updatedItem={...existingCartItem,amount:existingCartItem.amount-1};
            updatedItems=[...state.items];
            updatedItems[existingCartItemIndex]=updatedItem;
        };
        return(
            {
                items:updatedItems,
                totalAmount:updatedTotalAmount
            }
        )
    }
    if(action.type==='CLEAR'){
        return defaultCartState;
    }
    return defaultCartState
};


const CartProvider = (props) => {

    const [cartState,dispatchCartACtion] = useReducer(cartReducer,defaultCartState)
    
    const addItemToCartHandler = item => {
        dispatchCartACtion(
            {
                type:'ADD',
                item:item
            }
        )
    };

    const removeItemFromCartHandler = id => {
        dispatchCartACtion(
            {
                type:'REMOVE',
                id:id
            }
        )
    };
    const clearCartHandler = () =>{
        dispatchCartACtion(
            {
                type:'CLEAR'
            }


        )
    }

    const cartContext = {
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemToCartHandler,
        removeItem:removeItemFromCartHandler,
        clearCart:clearCartHandler
    }

    return(
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
    )
};
export default CartProvider;