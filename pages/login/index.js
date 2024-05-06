import { useRouter } from "next/router";
import React, { useState } from "react";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isInvalid, setIsInvalid] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) setEmail(null)
    if(!password || !password.match(/.{7,}/)) setPassword(null)
      if (!email || !password) {
        if (e.target[0].value != "") {
          setEmail(e.target[0].value)
          setPassword(e.target[1].value)
        } else {
          return
        }
      }

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(res => {
        if (!res.ok) {
            setIsInvalid(true);
        }
         const cookie = res.headers.get("Set-Cookie");

         // Set the cookie in the browser
         if (cookie) {
           document.cookie = cookie;
         }
        return res.json()
    }).then(data => {
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push("/");
    })
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card">
        <div className="card-body flex items-center">
          <h2 className="card-title">Login</h2>
          <form className="max-w-md mx-auto" onSubmit={handleSubmit} noValidate>
            <div className="form-control mb-4">
            <label className={"input input-bordered flex items-center gap-2 " + (email == null || isInvalid ? "border-red-500 rounded" : "")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  placeholder="Email"
                  autoComplete="current-email"
                  className="grow"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => setEmail(e.target.value)}
                />
              </label>
                {email == null ? <p class="text-red-500 text-xs italic">Please enter a email!</p> : <></>}
            </div>
            <div className="form-control mb-4"> 
              <label className={"input input-bordered flex items-center gap-2 " + (password == null || isInvalid ? "border-red-500 rounded" : "")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={(e) => setPassword(e.target.value)}
                  required={true}
                />
              </label>
                {password == null ? <p class="text-red-500 text-xs italic">Please enter a password!</p> : <></>}
            </div>
            {isInvalid ? <p className="text-red-500 text-sm italic">Invalid credentials!</p> : <></>}
            <div className="form-control mt-6 mb-4">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <div className="italic text-sm text-center mt-4">
              Don't have an account?{" "}
              <a href='/register' className="link">
                Register
              </a>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
