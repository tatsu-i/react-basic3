import React, { useState } from "react";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../const";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../AuthSlice";

export const Login = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const [cookies, setCookie] = useCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userData = {
        email: data.email,
        password: data.password,
      };
      const userResponse = await axios.post(`${url}/signin`, userData);
      const token = userResponse.data.token;
      setCookie("token", token);
      dispatch(signIn());
      navigate("/");
    } catch (error) {
      setErrorMessage(`サインインに失敗しました：${error.message}`);
    }
  };

  if (auth) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <Header />
      <main>
        <h2 className="text-2xl mb-5">サインイン</h2>
        <p>{errorMessage}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>メールアドレス</label>
          <br />
          <input
            {...register("email", {
              required: "Email is required",
            })}
            placeholder="Email"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
          <br />
          <label>パスワード</label>
          <br />
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            placeholder="Password"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
          <br />
          <button
            type="submit"
            className="mb-5 border rounded px-4 py-2 text-black transition-all duration-300 hover:bg-slate-100 hover:ring-2 hover:ring-neutral-800"
          >
            サインイン
          </button>
        </form>
        <Link
          to="/signup"
          className="border rounded px-4 py-2 text-black transition-all duration-300 hover:bg-slate-100 hover:ring-2 hover:ring-neutral-800"
        >
          新規作成
        </Link>
      </main>
    </>
  );
};
