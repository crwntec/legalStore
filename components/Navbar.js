import { useEffect, useState } from "react";
function Navbar({ cart, user, router }) {
  useEffect(() => {
    user !== undefined && cart !== undefined
      ? fetch(`/api/cart?user=${user.id}&cart=${cart.id}`, {
          method: "PUT",
          body: JSON.stringify(cart),
        }).catch((e) => (e.status == 500 ? {} : console.log(e)))
      : {};
  }, [cart]);

  const handleLogout = () => {
    fetch("/api/login", { method: "DELETE" })
      .then(() => (document.cookie = "pb_auth=;"))
      .then(() => localStorage.removeItem("user"))
      .then(() => router.push("/login"));
  };
  return (
    <div>
      <div className="navbar bg-base-100 border-b-[1px] border-gray-600 sticky">
        <div className="flex-1">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.486 2 2 6.486 2 12c0 3.258 1.29 6.368 3.59 8.64l.793-1.469C5.786 16.392 4 14.298 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8c-1.863 0-3.577-.645-4.93-1.724l-.726 1.448C8.935 19.548 10.792 20 12 20c5.514 0 10-4.486 10-10S17.514 2 12 2zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8c-1.553 0-3.01-.451-4.246-1.226l-.668 1.146C7.826 19.243 9.852 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8c0 2.285.975 4.344 2.532 5.789l.723-1.447C9.406 13.048 9 12.056 9 12c0-4.418 3.582-8 8-8z" />
            </svg>
          </div>
          <a className="btn btn-ghost text-xl" onClick={() => router.push("/")}>
            LegalStore
          </a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cart.items ? cart.items.length : 0}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">
                  {cart.items ? cart.items.length : 0} Items
                </span>
                <span className="text-info">
                  Subtotal: ${parseFloat(cart.subtotal).toFixed(2)}
                </span>
                <div className="card-actions">
                  <button
                    onClick={() =>
                      router.push(`/cart?id=${cart.id}&user=${user.id}`)
                    }
                    className="btn btn-primary btn-block"
                  >
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={`http://127.0.0.1:8090/api/files/_pb_users_auth_/${user.id}/${user.avatar}`}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">Coming soon</span>
                </a>
              </li>
              <li>
                <a>
                  Settings <span className="badge">Coming soon</span>
                </a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
