import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

const photo = (image) =>
  `https://images.unsplash.com/${image}?auto=format&fit=crop&w=400&q=80`;

const categories = [
  {
    name: "Easy-Care Plants",
    plants: [
      { id: 1, name: "Snake Plant", price: 20, image: photo("photo-1593482892290-f54927ae2b7a") },
      { id: 2, name: "ZZ Plant", price: 25, image: photo("photo-1545241047-6083a3684587") },
      { id: 3, name: "Golden Pothos", price: 15, image: photo("photo-1485955900006-10f4d324d411") },
      { id: 4, name: "Spider Plant", price: 18, image: photo("photo-1459411552884-841db9b3cc2a") },
      { id: 5, name: "Cast Iron Plant", price: 28, image: photo("photo-1497250681960-ef046c08a56e") },
      { id: 6, name: "Chinese Evergreen", price: 22, image: photo("photo-1501004318641-b39e6451bec6") },
    ],
  },
  {
    name: "Tropical Plants",
    plants: [
      { id: 7, name: "Monstera", price: 35, image: photo("photo-1501004318641-b39e6451bec6") },
      { id: 8, name: "Bird of Paradise", price: 45, image: photo("photo-1545241047-6083a3684587") },
      { id: 9, name: "Rubber Plant", price: 30, image: photo("photo-1497250681960-ef046c08a56e") },
      { id: 10, name: "Parlor Palm", price: 24, image: photo("photo-1459411552884-841db9b3cc2a") },
      { id: 11, name: "Philodendron", price: 26, image: photo("photo-1485955900006-10f4d324d411") },
      { id: 12, name: "Calathea", price: 32, image: photo("photo-1593482892290-f54927ae2b7a") },
    ],
  },
  {
    name: "Succulents",
    plants: [
      { id: 13, name: "Aloe Vera", price: 16, image: photo("photo-1459411552884-841db9b3cc2a") },
      { id: 14, name: "Jade Plant", price: 18, image: photo("photo-1485955900006-10f4d324d411") },
      { id: 15, name: "Echeveria", price: 12, image: photo("photo-1459411552884-841db9b3cc2a") },
      { id: 16, name: "Zebra Haworthia", price: 14, image: photo("photo-1485955900006-10f4d324d411") },
      { id: 17, name: "Burro's Tail", price: 20, image: photo("photo-1459411552884-841db9b3cc2a") },
      { id: 18, name: "String of Pearls", price: 22, image: photo("photo-1485955900006-10f4d324d411") },
    ],
  },
];

const buttonStyle = {
  padding: "12px 18px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#287a3e",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
};

export function Navbar({ onNavigate }) {
  const items = useSelector((state) => state.cart.items);
  const count = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav
      aria-label="Main navigation"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        padding: "20px",
        backgroundColor: "#183c25",
        color: "white",
      }}
    >
      <strong>Paradise Nursery</strong>

      <div style={{ display: "flex", gap: "12px" }}>
        <button
          style={buttonStyle}
          onClick={() => onNavigate("home")}
        >
          Home
        </button>

        <button
          style={buttonStyle}
          onClick={() => onNavigate("plants")}
        >
          Plants
        </button>

        <button
          style={buttonStyle}
          onClick={() => onNavigate("cart")}
          aria-label={`Cart, ${count} items`}
        >
          <span aria-hidden="true">🛒</span> Cart (
          <span aria-live="polite">{count}</span>)
        </button>
      </div>
    </nav>
  );
}

export default function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <>
      <Navbar onNavigate={onNavigate} />

      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "30px 20px",
        }}
      >
        <h1>Find Your Next Houseplant</h1>

        {categories.map((category) => (
          <section key={category.name}>
            <h2>{category.name}</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "24px",
                marginBottom: "40px",
              }}
            >
              {category.plants.map((plant) => {
                const added = cartItems.some(
                  (item) => item.id === plant.id
                );

                return (
                  <article
                    key={plant.id}
                    style={{
                      border: "1px solid #d5dfd7",
                      borderRadius: "12px",
                      padding: "20px",
                      textAlign: "center",
                      backgroundColor: "#f6faf6",
                    }}
                  >
                    <img
                      src={plant.image}
                      alt={plant.name}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />

                    <h3>{plant.name}</h3>
                    <p>${plant.price.toFixed(2)}</p>

                    <button
                      disabled={added}
                      onClick={() => dispatch(addItem(plant))}
                      style={{
                        ...buttonStyle,
                        backgroundColor: added
                          ? "#657368"
                          : "#287a3e",
                        cursor: added ? "default" : "pointer",
                      }}
                    >
                      {added ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
