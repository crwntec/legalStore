"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  const router = useRouter();

  const [theme, setTheme] = useState("dark")

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
    fetch(`/api/cart?user=${user.id}`, { method: "GET" })
      .then((response) => response.json())
      .then((cart) => setCart(cart));
  }, []);

  useEffect(() => {
    cart.items && user
      ? fetch(`/api/cart?user=${user.id}&id=${cart.id}`, {
          method: "PUT",
          body: JSON.stringify(cart),
        })
      : {};
  }, [cart]);

  const addToCart = (product) => () => {
    let newCart = { ...cart };
    !newCart.items ? (newCart.items = []) : null;
    const existingItem = newCart.items.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      newCart.items.push({ ...product, quantity: 1 });
    }
    newCart.subtotal += parseFloat(
      (
        product.price -
        product.price * (product.discountPercentage / 100)
      ).toFixed(2)
    );
    setCart(newCart);
  };

  return (
    <div>
     <Navbar cart={cart} />
      <main className="p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              className="card-compact w-96 h-96 bg-base-100 shadow-xl"
              key={product.id}
            >
              <figure className="h-32">
                <img
                  className="h-full object-cover"
                  src={product.thumbnail}
                  alt={product.name}
                />
              </figure>
              <div className="card-body h-64 overflow-auto">
                <h1 className="card-title">{product.title}</h1>
                <p>{product.description}</p>
                <div className="card-actions justify-end">
                  <span className="">
                    {product.discountPercentage > 0 ? (
                      <span>
                        <s>${product.price}</s>
                        <p>
                          $
                          {parseFloat(
                            (
                              product.price -
                              product.price * (product.discountPercentage / 100)
                            ).toFixed(2)
                          )} <span className="badge badge-success">-{product.discountPercentage}%</span>
                        </p>
                      </span>
                    ) : (
                      <span>${product.price}</span>
                    )}
                  </span>
                  <button
                    onClick={addToCart(product)}
                    className="btn btn-secondary"
                  >
                    Add to cart
                  </button>
                  <button className="btn" onClick={()=>router.push(`/products/${product.id}`)}>Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
