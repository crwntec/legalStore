"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";

import { RiDeleteBinLine } from "react-icons/ri";
import { IconContext } from "react-icons";

const Cart = () => {
  const [cart, setCart] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({});
  const [scopedItem, setScopedItem] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    if (!id) return;
    fetch(`/api/cart?id=${id}`, { method: "GET" })
      .then((response) => response.json())
      .then((cart) => setCart(cart));
  }, [id]);

  useEffect(() => {
    user
      ? fetch(`/api/cart?user=${user.id}&id=${cart.id}`, {
          method: "PUT",
          body: JSON.stringify(cart),
        })
      : {};
  }, [cart]);

  const setQuantity = (item, quantity) => {
    if (quantity <= 0) {
      document.getElementById("confirmDeletePrompt").showModal();
      setScopedItem(item);
    } else {
      item.quantity = quantity;
      setCart({
        ...cart,
        subtotal: cart.items.reduce((a, b) => a + b.price * b.quantity, 0),
      });
    }
  };

  const removeItem = () => {
    if (!cart.items || !scopedItem) return;
    cart.items = cart.items.filter((i) => i.id !== scopedItem.id);
    cart.subtotal = cart.items.reduce((a, b) => a + b.price * b.quantity, 0);
    setCart({ ...cart });
  };
  return (
    <div>
      <Navbar cart={cart} user={user} router={router} />
      <dialog id="confirmDeletePrompt" className="modal">
        <div className="modal-box">
          <p>Are you sure you want to delete this item?</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" id="cancelDeletePrompt">
                Cancel
              </button>
              <button
                onClick={() => removeItem()}
                className="btn btn-primary"
                id="confirmDelete"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="xl:px-56 px-5 flex flex-col lg:flex-row mt-3">
        <div className="flex flex-col divide-y mb-7  divide-gray-600 w-full">
          {cart.items &&
            cart.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between flex-col sm:flex-row items-start sm:items-center p-5 bg-base-200 rounded"
              >
                <div className="flex flex-row space-x-10 items-center">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-30 h-20"
                  />
                  <span>{item.title}</span>
                </div>
                <div className="flex flex-row mt-5 sm:mt-0 items-center">
                  <div className="relative sm:w-40">
                    <button
                      onClick={() => setQuantity(item, item.quantity - 1)}
                      className="absolute left-0 top-0 rounded-r-none btn btn-square"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="w-full text-center px-12 input input-bordered"
                      value={item.quantity}
                      onChange={(e) => {
                        setQuantity(item, e.target.value);
                      }}
                    />
                    <button
                      onClick={() => setQuantity(item, item.quantity + 1)}
                      className="absolute right-0 top-0 rounded-l-none btn btn-square"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-col w-24">
                    <span>
                      ${parseFloat(item.price * item.quantity).toFixed(2)}
                    </span>
                    {item.quantity > 1 && (
                      <span className="text-sm italic">
                        ${parseFloat(item.price).toFixed(2)} each
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setQuantity(item, 0);
                    }}
                    className="btn btn-error ml-5"
                  >
                    <IconContext.Provider
                      value={{ color: "white", size: "1.5em" }}
                    >
                      <RiDeleteBinLine />
                    </IconContext.Provider>
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="flex flex-row justify-center lg:ml-5 h-72 rounded-md bg-base-200 p-5">
          <div>
            <p className="text-3xl mb-5">Cart Summary</p>
            <div className="flex flex-col divide-y sm:w-64">
              <div>
                <p className="text-lg">
                  Subtotal: ${parseFloat(cart.subtotal).toFixed(2)}
                </p>
                <p className="text-lg">
                  Delivery: ${(cart.items ? cart.items.length % 5 : 0) * 8}
                </p>
                <p className="text-lg">
                  Tax: ${parseFloat(cart.subtotal * 0.012).toFixed(2)}
                </p>
              </div>
              <p className="text-lg">
                Total: $
                {parseFloat(
                  cart.subtotal +
                    cart.subtotal * 0.012 +
                    (cart.items ? cart.items.length % 5 : 0) * 8
                ).toFixed(2)}
              </p>
              <button
                className={
                  "btn btn-active mt-5 " +
                  (cart.items
                    ? cart.items.length == 0
                      ? "btn-ghost"
                      : "btn-primary"
                    : "btn-ghost")
                }
                onClick={() => {
                  cart.items.length > 0
                    ? router.push(`/checkout?id=${cart.id}`)
                    : {};
                }}
                disabled={!cart.items}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
