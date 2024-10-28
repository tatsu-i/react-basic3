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
        <h2>サインイン</h2>
        <p>{}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>メールアドレス</label>
          <br />
          <input
            {...register("email", {
              required: "Email is required",
            })}
            placeholder="Email"
          />
          {errors.email && <p>{errors.email.message}</p>}
          <br />
          <label>パスワード</label>
          <br />
          <input
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            placeholder="Password"
          />
          {errors.password && <p>{errors.password.message}</p>}
          <br />
          <button type="submit">サインイン</button>
        </form>
        <Link to="/signup">新規作成</Link>
      </main>
    </>
  );
};
