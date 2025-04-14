import { React, useContext } from "react";
import "./navbaar.css";
import AmazonLogo from "./app_logo_boder_less.png"; // Main Logo
import SearchIcon from "@mui/icons-material/Search"; // search icon for searching
import Badge from "@mui/material/Badge"; // Badge to show number of items in cart
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Shoping cart icon
import Avatar from "@mui/material/Avatar"; // Avatar for login
import { NavLink } from "react-router-dom";
import { Logincontext } from "../Context/Contextprovider";

const Navbaar = () => {
  const { account, setAccount } = useContext(Logincontext);
  console.log(account);


  return (
    <div>
      <header>
        <nav>
          <div className="left">
            <div className="navlogo">
              <NavLink to="/">
                <img src={AmazonLogo} alt="logo" />
              </NavLink>
            </div>
            <div className="nav_searchBar">
              <input type="text" name="" id="" placeholder="Search Here ..." />
              <div className="search_icon">
                <SearchIcon id="search" />
              </div>
            </div>
          </div>

          <div className="right">
            <div className="nav_btn">
              <NavLink to="/login">Sign in</NavLink>
            </div>
            <div className="cart_btn">
              {
                account ? <NavLink to="/buynow">
                <Badge badgeContent={account.carts.length} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>: <NavLink to="/login">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
              }
              

              <p>Cart</p>
            </div>
            {
              account ? <Avatar className="avatar">{account.fname[0].toUpperCase()}</Avatar> : <Avatar className="avatar"></Avatar>
            }

          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbaar;
