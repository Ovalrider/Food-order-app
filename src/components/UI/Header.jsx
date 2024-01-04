import React, { useContext } from "react";
import logo from '/src/assets/logo.jpg'
import Button from "./Button";
import CartContext from "../../store/CartContext";
import UserProgressContext from "../../store/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext)
  const totalItems = cartCtx.items.reduce((totalNum, item)=>{return totalNum + item.quantity }, 0 )
  const userProgressCtx = useContext(UserProgressContext)

  function handleShowCart(){
    userProgressCtx.showCart()
  }
  return (
    <header id='main-header'>
      <div id="title">
        <img src={logo} alt="Restaurant"></img>
        <h1>My Food Order App</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalItems})</Button>
      </nav>
    </header>
  );
}
