function Payment({ card, setCard, nextStep }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !e.target[0].value ||
      !e.target[1].value ||
      !e.target[2].value ||
      !e.target[3].value
    )
      return;
    setCard({
      cardholder: e.target[0].value,
      cardNumber: e.target[1].value,
      expiryDate: e.target[2].value,
      cvv: e.target[3].value,
    });
    nextStep();
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "cardNumber":
        if (e.target.value.length > 19) return;
        e.target.value = e.target.value
          .replace(/\D/g, "")
          .replace(/(.{4})/g, "$1 ")
          .trim();
        break;
      case "expiryDate":
        if (e.target.value.length > 7) return;
        e.target.value = e.target.value
          .replace(/\D/g, "")
          .replace(/^(.{2})/g, "$1/")
          .trim();
        break;
      case "cvv":
        if (e.target.value.length > 4) return;
        e.target.value = e.target.value.replace(/\D/g, "");
        break;
    }
  };

  return (
    <div className="flex justify-center">
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Cardholder's Name</span>
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="input input-bordered"
            value={card.cardholder}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Card Number</span>
          </label>
          <input
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            className="input input-bordered"
            type="text"
            maxLength="19"
            onChange={handleChange}
            required
            value={card.cardNumber}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Expiry Date</span>
            </label>
            <input
              name="expiryDate"
              type="text"
              maxLength="5"
              placeholder="MM/YY"
              className="input input-bordered"
              onChange={handleChange}
              required
              value={card.expiryDate}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">CVV</span>
            </label>
            <input
              name="cvv"
              type="text"
              maxLength="3"
              placeholder="123"
              className="input input-bordered"
              onChange={handleChange}
              required
              value={card.cvv}
            />
          </div>
        </div>
        <button className="btn btn-primary mt-5">Submit</button>
      </form>
    </div>
  );
}

export default Payment;
