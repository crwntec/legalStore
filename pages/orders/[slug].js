"use client";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { baseURL } from "../../data/baseURL";
import Navbar from "../../components/Navbar";

import { UilHourglass } from "@iconscout/react-unicons";
import CheckmarkHollow from "../../icons/CheckmarkHollow";

export const getServerSideProps = async (context) => {
  const res = await fetch(`${baseURL}/api/orders?id=${context.params.slug}`);
  const order = await res.json();

  const cartRes = await fetch(`${baseURL}/api/cart?user=${order.user}`);
  const cart = await cartRes.json();

  return {
    props: { order, cart },
  };
};

function Order({ order, cart }) {
  const router = useRouter();
  const [user, setUser] = useState({});
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  return (
    <>
      <Navbar cart={cart} />
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center">
          <CheckmarkHollow size={100} />
          <h1 className="text-2xl font-bold mb-4">#{order.id.toUpperCase()}</h1>
          <h1 className="text-2xl font-bold mb-4">
            Order Confirmed. Thank you for your purchase!
          </h1>
        </div>
        <div className="container">
          <div className="flex justify-center">
            <ul className="steps steps-vertical lg:steps-horizontal">
              <li
                className={
                  "step " + (order.status >= 0 ? "step-primary" : "step")
                }
              >
                Pending
              </li>
              <li
                className={
                  "step " + (order.status >= 1 ? "step-primary" : "step")
                }
              >
                Processing
              </li>
              <li
                className={
                  "step " + (order.status >= 2 ? "step-primary" : "step")
                }
              >
                Shipped
              </li>
              <li
                className={
                  "step " + (order.status >= 3 ? "step-primary" : "step")
                }
              >
                Delivered
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row mt-4">
          <div className="sm:w-1/2 w-full p-4 border border-base-300 bg-base-200 rounded-md">
            <h1 className="text-2xl font-bold mb-4">Payment Details</h1>
            <div className="card">
              <p className="mb-2">Cardholder: {order.payment.cardholder}</p>
              <p className="mb-2">
                Card Number:{" "}
                {order.payment.cardNumber.replace(/.{15}/, "**** **** **** ")}
              </p>
              <p className="mb-2">Expiry Date: {order.payment.expiryDate}</p>
              <p>CVV: {order.payment.cvv.replace(/.{3}/, "***")}</p>
            </div>
          </div>
          <div className="sm:w-1/2 w-full ml-5 p-4 border border-base-300 bg-base-200 rounded-md">
            <h1 className="text-2xl font-bold mb-4">Delivery Details</h1>
            <div className="card">
              <p className="mb-2">Name: {order.delivery.name}</p>
              <p className="mb-2">Email: {user.email} </p>
              <p>
                Address: {order.delivery.street}, {order.delivery.zipCode}{" "}
                {order.delivery.city}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full mt-4">
          <div
            tabIndex={0}
            className="collapse collapse-arrow border border-base-300 bg-base-200"
          >
            <div className="text-2xl font-bold mb-4 collapse-title">
              Order Summary
            </div>
            <div className="collapse-content">
              {order.cart.items.map((item) => (
                <div key={item.id} className="flex items-center mb-2">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-20 h-20 mr-2"
                  />
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      Price: ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr className="my-4" />
          <p className="text-lg"> Subtotal: ${order.subtotal}</p>
          <p className="text-lg"> Delivery Fee: ${order.deliveryFee}</p>
          <p className="text-lg font-bold mt-4"> Total: ${order.total}</p>
        </div>
      </div>
    </>
  );
}

export default Order;
