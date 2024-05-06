"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

import { UilAngleRight } from '@iconscout/react-unicons'
import { UilTruck } from '@iconscout/react-unicons'

import moment from "moment";
import { useRouter } from "next/router";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);

  const router = useRouter()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    fetch("/api/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data.items))
      .catch((error) => console.error(error));
    fetch(`/api/cart?user=${user.id}`, { method: "GET" })
      .then((response) => response.json())
      .then((cart) => setCart(cart));
  }, []);

  const status = ["Pending", "Processing", "Shipped", "Delivered"];

  return (
    <>
      <Navbar cart={cart} />
      <div className="bg-base-200 py-2 m-4 rounded-lg">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div className={"flex items-center justify-end " +(index < orders.length - 1 ? "border-b-[1px] border-gray-600" : "")}>
              <div key={order.id} className="card">
                <div className="card-body">
                  <h2 className="card-title">
                    {moment(order.created).format("DD.mm.yyyy")}: #
                    {order.id.toUpperCase()}
                  </h2>
                  <p>Order status: {status[order.status]}</p>
                </div>
              </div>
              <div className="tooltip ml-auto mr-10" data-tip="Track Order">
                <button onClick={()=>router.push("https://www.youtube.com/watch?v=oHg5SJYRHA0")}>
                  <UilTruck size="40" />
                </button>
              </div>
              <div className="tooltip mr-10" data-tip="View Order details">
                <button onClick={()=>router.push(`/orders/${order.id}`)}>
                  <UilAngleRight size="40" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </>
  );
}
