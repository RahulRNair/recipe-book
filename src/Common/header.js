import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="header-nav">
      <div className="text-center header-title" ><Link to={"/"}>Receipe Book</Link></div>
    </nav>
  );
}
export default Header;