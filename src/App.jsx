import MealContainer from "./components/Meals/MealContainer";
import Header from "./components/UI/Header";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import Cart from "./components/UI/Cart";
import Checkout from "./components/UI/Checkout";

function App() {
  return (
    <CartContextProvider>
      <UserProgressContextProvider>
        <Header />
        <MealContainer />
        <Cart/>
        <Checkout/>
      </UserProgressContextProvider>
    </CartContextProvider>
  );
}

export default App;
