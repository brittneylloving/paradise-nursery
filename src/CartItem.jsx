import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import { Navbar } from "./ProductList";

const buttonStyle = {
  padding: "10px 16px",
  margin: "5px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#287a3e",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
};

export default function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function changeQuantity(item, change) {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + change,
      })
    );
    setCheckoutMessage("");
  }

  return (
    <>
      <Navbar onNavigate={onNavigate} />

      <main
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "30px 20px",
        }}
      >
        <h1>Your Shopping Cart</h1>

        <div aria-live="polite">
          <p>Total plants: {totalQuantity}</p>
          <h2>Total amount: ${totalAmount.toFixed(2)}</h2>
        </div>

        {items.length === 0 ? (
          <p>Your cart is empty. Find a plant you love!</p>
        ) : (
          items.map((item) => (
            <article
              key={item.id}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "24px",
                padding: "20px",
                marginBottom: "20px",
                border: "1px solid #d5dfd7",
                borderRadius: "12px",
                backgroundColor: "#f6faf6",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              <div style={{ flex: "1 1 250px" }}>
                <h2>{item.name}</h2>
                <p>Unit price: ${item.price.toFixed(2)}</p>

                <div>
                  <button
                    style={buttonStyle}
                    aria-label={`Decrease quantity of ${item.name}`}
                    onClick={() => changeQuantity(item, -1)}
                  >
                    −
                  </button>

                  <span aria-live="polite">
                    Quantity: {item.quantity}
                  </span>

                  <button
                    style={buttonStyle}
                    aria-label={`Increase quantity of ${item.name}`}
                    onClick={() => changeQuantity(item, 1)}
                  >
                    +
                  </button>
                </div>

                <p>
                  <strong>
                    Plant total: $
                    {(item.price * item.quantity).toFixed(2)}
                  </strong>
                </p>

                <button
                  style={{
                    ...buttonStyle,
                    backgroundColor: "#a52a2a",
                  }}
                  aria-label={`Delete ${item.name} from cart`}
                  onClick={() => {
                    dispatch(removeItem(item.id));
                    setCheckoutMessage("");
                  }}
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        )}

        <button
          style={buttonStyle}
          onClick={() => onNavigate("plants")}
        >
          Continue Shopping
        </button>

        <button
          disabled={items.length === 0}
          style={{
            ...buttonStyle,
            opacity: items.length === 0 ? 0.5 : 1,
            cursor:
              items.length === 0 ? "default" : "pointer",
          }}
          onClick={() =>
            setCheckoutMessage("Checkout is coming soon!")
          }
        >
          Checkout
        </button>

        <p role="status">{checkoutMessage}</p>
      </main>
    </>
  );
}
