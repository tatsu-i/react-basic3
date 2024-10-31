import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserName, signOut } from "../AuthSlice";
import axios from "axios";
import { url } from "../const";

const Header = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const userName = useSelector((state) => state.auth.userName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie("token");
    navigate("/login");
  };

  useEffect(() => {
    if (auth && cookies.token) {
      axios
        .get(`${url}/users`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => {
          dispatch(setUserName(res.data.name));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [auth, cookies.token]);

  return (
    <header className="bg-slate-200">
      <div className="h-14 flex justify-between container mx-auto items-center px-4">
        <div>
          <h1 className="text-2xl">書籍レビューアプリ</h1>
          {auth && cookies.token ? <p>ユーザー名：{userName}</p> : <></>}
        </div>
        {auth && cookies.token ? (
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
