import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../../store/CartContext";
import { currencyFormatter } from "../../util/formatting";
import Input from "./Input";
import Button from "./Button";
import UserProgressContext from "../../store/UserProgressContext";
import useHttp from "../../hooks/useHttp";

const requestConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};
export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalPrice = cartCtx.items.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);

  const { data, isLoading, error, sendRequest , clearData} = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
    
  }

  function handleFinish(){
    cartCtx.clearCart()
    userProgressCtx.hideCheckout();
    clearData()
  }
  function handleFormSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isLoading) {
    actions = <span>Sending order data</span>;
  }

  if (data) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={userProgressCtx.progress === "checkout" ? handleFinish : null}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p className="modal-actions"><Button type="button" onClick={handleFinish}>
        Close
      </Button></p>
        
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={userProgressCtx.progress === "checkout" ? handleClose : null}
    >
      <form onSubmit={handleFormSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalPrice)}</p>
        <Input type="text" id="name" label="Full Name" />
        <Input type="email" id="email" label="Email" />
        <Input type="text" id="street" label="Street" />
        <div className="control-row">
          <Input type="text" id="postal-code" label="Postal Code" />
          <Input type="text" id="city" label="City" />
        </div>
        {error && <p>Failed to send order data.</p>}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
