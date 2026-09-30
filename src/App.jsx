import { useState } from "react";
import AboutUs from "./AboutUs";
import ProductList from "./ProductList";
import CartItem from "./CartItem";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");

  if (page === "plants") {
    return <ProductList onNavigate={setPage} />;
  }

  if (page === "cart") {
    return <CartItem onNavigate={setPage} />;
  }

  return (
    <main className="landing-page">
      <div className="landing-content">
        <h1>Paradise Nursery</h1>
        <p>Bring nature home, one plant at a time.</p>

        <button
          type="button"
          className="get-started-button"
          onClick={() => setPage("plants")}
        >
          Get Started
        </button>

        <AboutUs />
      </div>
    </main>
  );
}
