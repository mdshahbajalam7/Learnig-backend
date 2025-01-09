import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router";
export default function NavbarHeader() {
  const navigate = useNavigate();
  const handleclick = () => {
    navigate("/create-user-list");
  };
  return (
    <div className="Navbar">
      <div className="navbar-header">
        <div className="navbar-brand" onClick={() => navigate("/")}>
          chand
        </div>

        <div className="navbar-toggle">
          <button className="button" onClick={handleclick}>
            Create User List
          </button>
        </div>
      </div>
    </div>
  );
}
