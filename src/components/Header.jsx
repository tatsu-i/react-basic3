import React from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../AuthSlice";

const Header = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies();
  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie("token");
    navigate("/login");
  };

  return (
    <header>
      <div className="header-container">
        <h1>Todoアプリ</h1>
        {auth ? (
          <button onClick={handleSignOut} className="signout-button">
            サインアウト
          </button>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
};

export default Header;
