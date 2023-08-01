import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "./nav/ProfileMenu";
import { useGlobal } from "../context/context";
import { toast } from 'react-toastify';
import AddPropertyModal from "../properties/AddPropertyModal";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [modalOpened,setModalOpened]=useState(false);
  const { userDetails } = useGlobal();
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  const getMenuStyles = (open) => {
    if (document.body.clientWidth <= 800) {
      return { right: !open && "4%" };
    }
  };

  const handleAddPropertyClick=function(){
    if(!userDetails.isLoggedIn){
      return toast.error('Login first to add property')
    }
    setModalOpened(true);
  }

  return (
    <section className="h-wrapper" style={{ background: "#302e2e" }}>
      <div className="flexCenter innerWidth paddings h-container around">
        {/* logo */}
        <Link to={"/"}>
          <img src="./logo.png" alt="logo" width={100} />
        </Link>

        <div
          // ref={menuRef}
          className="flexCenter h-menu"
          style={getMenuStyles(menuOpened)}
        >
          <NavLink to={"/properties"}>Properties</NavLink>
          <NavLink to={"/"}>Contact Us</NavLink>
          <div onClick={handleAddPropertyClick}>Add Property</div>
            <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />
          {!userDetails.user ? (
            <button className="button" onClick={loginWithRedirect}>
              Login
            </button>
          ) : (
            <ProfileMenu user={user} logout={logout} />
          )}
        </div>
        
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
