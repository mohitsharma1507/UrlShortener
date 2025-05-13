import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../utils/auth";

function Navbar() {
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(getCurrentUser());
  }, [location]);
  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: " #002147", borderBottom: " 1px solid black" }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <b
            style={{ color: "orangered", fontSize: "26px", fontWeight: "400" }}
          >
            Bitly
          </b>
        </Link>
        <div className="collapse navbar-collapse">
          <ul
            className="navbar-nav"
            style={{ marginLeft: "65rem", gap: "3rem" }}
          >
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
