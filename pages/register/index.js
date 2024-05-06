import React from "react";
import router, { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [passwordMatch, setPasswordMatch] = React.useState(true)
  const handleSubmit = (e) => {
    e.preventDefault();
    setName(e.target[0].value)
    setEmail(e.target[1].value)
    setPassword(e.target[2].value)
    setPasswordConfirm(e.target[3].value)
    if (!email || !email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) setEmail(null)
    if(!password || !password.match(/.{7,}/)) setPassword(null)
    if (!name || !email || !password || !passwordConfirm) {
      if (!name) setName(null)
      if (!passwordConfirm) setPasswordConfirm(null)
    }
    if (!name || !email || !password || !passwordConfirm || !passwordMatch) {
      return
    } else {
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
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="card">
          <div className="card-body flex items-center">
            <h2 className="card-title">Register</h2>
            <form
              className="max-w-md mx-auto"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="">
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className={"input input-bordered " + (name == null ? " border-red-500 rounded" : "")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  {name == null ? <p class="text-red-500 text-xs italic">Please enter your name!</p> : <></>}
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    className={"input input-bordered " + (email == null ? " border-red-500 rounded" : "")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  />
                  {email == null ? <p class="text-red-500 text-xs italic">Please enter a valid email!</p> : <></>}
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
                    className={"input input-bordered " + (password == null ? " border-red-500 rounded" : "")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    pattern=".{7,}"
                  />
                  {password == null ? <p class="text-red-500 text-xs italic">Please enter a valid password!</p> : <></>}
                </div>
                <div className="form-control mb-4 max-w-xs overflow-hidden">
                  {" "}
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className={"input input-bordered " + (passwordConfirm == null || !passwordMatch ? " border-red-500 rounded" : "")}
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required
                    pattern=".{7,}"
                  />
                  {passwordConfirm == null ? <p class="text-red-500 text-xs italic">Please confirm your password!</p> : <></>}
                  {!passwordMatch && passwordConfirm ? <p class="text-red-500 text-xs italic">Passwords don't match!</p> : <></>}
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
