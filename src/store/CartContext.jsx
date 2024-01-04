import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      ...state,
      items: updatedItems,
    };
  }
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      items: [],
    };
  }
}


export function CartContextProvider(props) {
  const [cart, setCart] = useReducer(cartReducer, { items: [] });
  function addItem(item) {
    setCart({ type: "ADD_ITEM", item});
  }
  function removeItem(id) {
    setCart({ type: "REMOVE_ITEM", id });
  }
  function clearCart(){
    setCart({ type: "CLEAR_CART"});
  }
  const cartContext = {
    items : cart.items,
    addItem,
    removeItem,
    clearCart
  }
  return (<CartContext.Provider value ={cartContext}>{props.children}</CartContext.Provider>);
}

export default CartContext;
