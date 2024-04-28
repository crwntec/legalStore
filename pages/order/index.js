import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { baseURL } from "../../data/baseURL";
import Navbar from "../../components/Navbar";

export const getServerSideProps = async (context) => {
  const res = await fetch(`${baseURL}/api/orders?id=${context.query.id}`);
  const order = await res.json();

  const cartRes = await fetch(`${baseURL}/api/cart?id=${order.cart}`);
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
          <Navbar cart={cart} user={user} router={router} />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Order Details</h1>
                <div className="bg-base-200 shadow-md rounded-md p-4 mb-4">
                <p className="mb-2">Order ID: {order.id}</p>
                <p className="mb-2">Status: {order.status}</p>
                <p className="mb-2">Total: {order.total}</p>
              </div>
            </div>
    </>
  );
}

export default Order;
