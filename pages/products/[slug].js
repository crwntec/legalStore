import React, { useEffect, useState } from "react";
import { baseURL } from "../../data/baseURL";
import Navbar from "../../components/Navbar";

export const getServerSideProps = async (context) => {
  const res = await fetch(`${baseURL}/api/products?id=${context.params.slug}`);
  const product = await res.json();

  return {
    props: { product },
  };
};

export default function Product({ product }) {
  const [cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [user, setUser] = useState({});
  useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
    fetch(`/api/cart?user=${user.id}`, { method: "GET" })
      .then((res) => res.json())
      .then((cart) => setCart(cart))
      .then(() => {});
  }, []);
    useEffect(() => { 
        cart.items && user
            ? fetch(`/api/cart?user=${user.id}&id=${cart.id}`, {
                method: "PUT",
                body: JSON.stringify(cart),
            })
            : {};
     }, [cart]);
    const addToCart = () => {
      let newCart = { ...cart };
      !newCart.items ? (newCart.items = []) : null;
      const existingItem = newCart.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity+= quantity;
      } else {
        newCart.items.push({ ...product, quantity: quantity });
      }
      newCart.subtotal += parseFloat(
        (
          product.price -
          product.price * (product.discountPercentage / 100)
        ).toFixed(2)
      );
        setCart(newCart);
        setQuantity(1)
    };
  return (
    <>
      <Navbar cart={cart} />
      <div className="p-4 w-full flex flex-col md:flex-row">
        <div className="carousel w-full">
          {product.images.map((image, index) => (
            <div id={"slide" + index} className="carousel-item relative w-full">
              <img
                key={index}
                src={image}
                alt={product.title}
                className="w-full h-96 md:h-[50rem]"
              />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href={"#slide" + (index - 1)} className="btn btn-circle">
                  ❮
                </a>
                <a href={"#slide" + (index + 1)} className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center sm:ml-4">
          <h1 className="text-2xl font-bold mt-2 lg:mt-0">{product.title}</h1>
          <p className="text-lg mt-4">{product.description}</p>
          <div className="flex items-center mt-4">
            <div className="rating rating-md rating-half">
              <input type="radio" name="rating-10" className="rating-hidden" />
              {Array.from({ length: 5 }).map((_, index) => (
                <>
                  <input
                    type="radio"
                    name="rating-10"
                    className="bg-green-500 mask mask-star-2 mask-half-1"
                    checked={
                      Math.round(product.rating * 2) / 2 === index + 1 / 2
                    }
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-10"
                    className="bg-green-500 mask mask-star-2 mask-half-2"
                    checked={Math.round(product.rating * 2) / 2 === index + 1}
                    readOnly
                  />
                </>
              ))}
            </div>
            ({Math.round(product.stock / 1.2)})
          </div>
          {product.discountPercentage > 0 ? (
            <div className="flex mt-6">
              <p className="text-2xl text-gray-500 mr-1">${product.price}</p>
              <p className="text-2xl">
                {" "}
                $
                {parseFloat(
                  (
                    product.price -
                    product.price * (product.discountPercentage / 100)
                  ).toFixed(2)
                )}{" "}
              </p>
            </div>
          ) : (
            <p className="text-2xl">${product.price}</p>
          )}
          <div className="divider"></div>
          <div className="flex items-center justify-between">
            <div className="relative sm:w-40">
              <button
                onClick={() => setQuantity(quantity - 1)}
                className="absolute left-0 top-0 rounded-r-none btn btn-square"
              >
                -
              </button>
              <input
                type="text"
                className="w-full text-center px-12 input input-bordered"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="absolute right-0 top-0 rounded-l-none btn btn-square"
              >
                +
              </button>
            </div>
            <button className="btn btn-primary ml-3" onClick={() => {addToCart()}}>
              {" "}
              Add to cart
                      </button>
                      
          </div>
        </div>
      </div>
    </>
  );
}
