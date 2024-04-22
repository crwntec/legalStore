import { useRouter } from "next/router";
import React from "react";

const Card = ({ children }) => (
  <div className="bg-base-200 shadow-md rounded-md p-4 mb-4">{children}</div>
);

const calculateTotal = (cart) => {
  return parseFloat(
    cart.subtotal +
      cart.subtotal * 0.012 +
      (cart.items ? cart.items.length % 5 : 0) * 8
  ).toFixed(2);
};


function Summary({ cart, card, delivery, user }) {
  const total = calculateTotal(cart);
  const router = useRouter()
  const submitOrder = () => {
    fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({
        user: user.id,
        cart: cart.id,
        address: delivery,
        payment: card,
        total: total,
      }),
    }).then(res=>res.json())
      .then((data) => {
      router.push(`/success?order=${data.id}`);
    
    });
  
  }

  return (
    <div className="flex w-full flex-col sm:flex-row justify-center items-center">
      <div className="container mx-auto p-4">
        <div>
          <h1 className="text-2xl font-bold mb-4">Payment Details</h1>
          <Card>
            <p className="mb-2">Cardholder: {card.cardholder}</p>
            <p className="mb-2">Card Number: {card.cardNumber}</p>
            <p className="mb-2">Expiry Date: {card.expiryDate}</p>
            <p>CVV: {card.cvv}</p>
          </Card>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-4">Delivery Details</h1>
          <Card>
            <p className="mb-2">Name: {delivery.name}</p>
            <p className="mb-2">Email: {user.email} </p>
            <p>
              Address: {delivery.street}, {delivery.zipCode} {delivery.city}
            </p>
          </Card>
        </div>
      </div>

      <div className="sm:w-1/2 w-full p-4 sm:p-0 sm:h-full">
        <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
        <Card>
          {cart.items.map((item) => (
            <div key={item.id} className="flex items-center mb-2">
              <img src={item.thumbnail} alt={item.name} className="w-10 h-10 mr-2" />
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm text-gray-500">
                  Price: ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          <p className="text-lg font-bold mt-4"> Total: ${total}</p>
        </Card>
        <button className="btn btn-primary mt-4 w-full" onClick={submitOrder}>Order now</button>
      </div>
    </div>
  );
}

export default React.memo(Summary);
