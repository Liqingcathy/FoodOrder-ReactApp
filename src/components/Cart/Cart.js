import React, { useContext, useState } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
    const [isCheckOut, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    //for showing successufl submittion messg
    const [didSubmit, setDidSubmit] = useState(false);

    //get access to cartcontext(add item) components
    const cartCtx = useContext(CartContext);
    //total amount of added items
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    //check if has item in the cart
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    //in the cart, when click +(add), adds amount of itmes
    const cartItemAddHandler = item => {
        cartCtx.addItem(item);
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    //Post request: order form user data is sendt to backend 
    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://foodorderreactapp-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            }),
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };


    //added items in the cart in an array
    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => ( //added item array
                //cartItem lists added items in the cart
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    //CartItem.js has onRemove/onAdd buttons
                    //bind - preconfigures function, argument(id,item) for future execution
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button-alt']}
                onClick={props.onClose}>Close</button>
            {hasItems && (<button className={classes.button} onClick={orderHandler}>Order</button>
            )}
        </div>
    );

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckOut && (
                <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
            )}
                {!isCheckOut && modalActions}
        </React.Fragment>
    );

const isSubmittingModalContent = <p>Sending order data...</p>;

const didSubmitModalContent = (
    <React.Fragment>
    <p>Successfuly submitted</p>
    <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
            Close
        </button>
    </div>
    </React.Fragment>
);

return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};
export default Cart;