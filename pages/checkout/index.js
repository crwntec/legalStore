"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Payment from "../../components/Form/Payment";
import Delivery from "../../components/Form/Delivery";
import Summary from "../../components/Form/Summary";

function Checkout() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({});

  const [step, setStep] = useState(0);
  
  const [card, setCard] = useState({});
  const [delivery, setDelivery] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    if (!id) return;
    fetch(`/api/cart?cart=${id}`, { method: "GET" })
      .then((response) => response.json())
      .then((cart) => setCart(cart));
  }, [id]);
    
    

    const nextStep = () => setStep(step + 1);
    const navigateToStep = (newStep) => () => newStep >= step ? setStep(step) : setStep(newStep);

  return (
    <div>
      <Navbar cart={cart} user={user} router={router} />
      <div className="flex flex-col items-center">
        <div className="breadcrumbs">
          <ul>
            <li className={step === 0 ? "text-accent" : ""}>
              <a onClick={navigateToStep(0)}>Payment</a>
            </li>
            <li className={step === 1 ? "text-accent" : ""}>
              <a onClick={navigateToStep(1)}>Delivery</a>
            </li>
            <li className={step === 2 ? "text-accent" : ""}>
              <a onClick={navigateToStep(2)}>Summary</a>
            </li>
          </ul>
        </div>
        {step === 0 && <Payment card={card} setCard={setCard} nextStep={nextStep} />}
        {step === 1 && <Delivery delivery={delivery} setDelivery={setDelivery} nextStep={nextStep} />}
              {step === 2 && <Summary cart={cart} card={card} delivery={delivery} user={user} />}
      </div>
    </div>
  );
}

export default Checkout;
