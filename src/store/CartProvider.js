
//wrapping components for accessing all to the context
import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0
};

//when item is added/removed, trigger the reducer funciton 
const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    //for function to accumulating the same item amount istead seperately
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    );

    //get existing cart item by find index through above function
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      };
      //The array2 has the elements of array1 copied into it. Any changes made to array1 will not be reflected in array2 and vice versa.
      updatedItems = [...state.items];
      //overwrite the updated item on the position of the original array
      updatedItems[existingCartItemIndex] = updatedItem;
    } else { //added for the first time, not in the array yet
      updatedItems = state.items.concat(action.item);//add new item to a new array
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

if(action.type === 'REMOVE'){
  const existingCartItemIndex = state.items.findIndex(
    (item) => item.id === action.id
  );
  const existingItem = state.items[existingCartItemIndex];
  const updatedTotalAmount = state.totalAmount - existingItem.price;
  let updatedItems;
  if(existingItem.amount === 1) {
    //if filter(action id is not the item id) true>>> remove that item
    //if filter(action id is the item id) false>>> decrement by 1
    updatedItems = state.items.filter(item => item.id !== action.id);
  }else{
    const updatedItem = {
      ...existingItem, amount: existingItem.amount-1};
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  if(action.type === 'CLEAR'){
    return defaultCartState;
  }
  return defaultCartState;
};


const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer, defaultCartState
  );

  const addItemToCartHandler = (item) => {//item 更新
    dispatchCartAction({ type: 'ADD', item: item }); //自己决定action
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({type: 'CLEAR'});
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };



  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;