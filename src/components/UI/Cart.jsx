import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../../store/CartContext";
import { currencyFormatter } from "../../util/formatting";
import Button from "./Button";
import UserProgressContext from "../../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const totalPrice = cartCtx.items.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);
  const userProgressCtx = useContext(UserProgressContext);

  function handleClose() {
    userProgressCtx.hideCart();
  }
  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }
  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"} onClose={userProgressCtx.progress === "cart"? handleClose : null}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onIncrease={()=> cartCtx.addItem(item)}
            onDecrease={()=> cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleClose}>
          Close
        </Button>
        {cartCtx.items.length > 0 ? <Button onClick={handleGoToCheckout}>Go to Checkout</Button> : null}
      </p>
    </Modal>
  );
}
