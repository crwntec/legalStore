function Delivery({ delivery, setDelivery, nextStep }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setDelivery({
        name: e.target[0].value,
        street: e.target[1].value,
        zipCode: e.target[2].value,
        city: e.target[3].value,
    })
    nextStep();
  };

  return (
    <div className="flex justify-center">
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="form-control">
            <label className="label"><span>Name</span></label>
            <input type="text" required className="input input-bordered" value={delivery.name} />
        </div>
        <div className="form-control">
            <label className="label"><span>Street</span></label>
            <input type="text" required className="input input-bordered" value={delivery.street} />
        </div>
        <div className="grid grid-cols-2 gap-2">
            <div className="form-control">
                <label className="label"><span>Zip Code</span></label>
                <input type="text" required maxLength={4} className="input input-bordered" value={delivery.zipCode} />
            </div>
            <div className="form-control">
                <label className="label"><span>City</span></label>
                <input type="text" className="input input-bordered" value={delivery.city} />
            </div>
        </div>
        <button className="btn btn-primary mt-5">Submit</button>
      </form>
    </div>
  );
}
export default Delivery;
