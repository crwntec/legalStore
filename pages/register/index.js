import React from "react";
import router, { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
        passwordConfirm,
      }),
    }).then((res) =>
      res.status == 200 ? router.push("/login") : alert("Error")
    );
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="card">
          <div className="card-body flex items-center">
            <h2 className="card-title">Register</h2>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
              <div className="">
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    className="input input-bordered"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="form-control mb-4 mr-4 max-w-xs">
                  {" "}
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4 max-w-xs overflow-hidden">
                  {" "}
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="input input-bordered"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-control mt-6 mb-4">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
