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
    <header className="bg-slate-200">
      <div className="h-14 flex justify-between container mx-auto items-center px-4">
        <h1 className="text-2xl">書籍レビューアプリ</h1>
        {auth ? (
          <button
            onClick={handleSignOut}
            className="inline-flex h-8 items-center justify-center rounded-md bg-zinc-500 px-5 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95"
          >
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
