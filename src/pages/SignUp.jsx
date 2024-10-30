import React, { useState } from "react";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import Compressor from "compressorjs";
import axios from "axios";
import { url } from "../const";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { signIn } from "../AuthSlice";

export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [errorMessage, setErrorMessage] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // ユーザー情報登録
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const userResponse = await axios.post(`${url}/users`, userData);
      const token = userResponse.data.token;
      setCookie("token", token);

      // 画像ファイルを圧縮、アップロード
      const file = data.icon[0];
      new Compressor(file, {
        quality: 0.6,
        success: async (compressedFile) => {
          try {
            const formData = new FormData();
            formData.append("icon", compressedFile);
            await axios.post(`${url}/uploads`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            });
            dispatch(signIn);
            navigate("/");
          } catch (error) {
            setErrorMessage(
              `画像のアップロードに失敗しました：${error.message}`
            );
          }
        },
        error: (err) => {
          setErrorMessage(`画像の圧縮に失敗しました：${err.message}`);
        },
      });
    } catch (error) {
      setErrorMessage(`サインアップに失敗しました：${error.message}`);
    }
    // console.log(cookies.token);
  };

  return (
    <>
      <Header />
      <main>
        <h2 className="text-2xl mb-5">新規作成</h2>
        <p>{errorMessage}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>名前</label>
          <br />
          <input
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 4,
                message: "Name must be at least 4 characters",
              },
            })}
            placeholder="Name"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
          />
          {errors.name && <p>{errors.name.message}</p>}
          <br />
          <label>メールアドレス</label>
          <br />
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            })}
            placeholder="Email"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
          />
          {errors.email && <p>{errors.email.message}</p>}
          <br />
          <label>パスワード</label>
          <br />
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            type="password"
            placeholder="Password"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
          />
          {errors.password && <p>{errors.password.message}</p>}
          <br />
          <label>アイコン</label>
          <br />
          <input
            {...register("icon")}
            accept="image/jpeg, image/png"
            required
            type="file"
          />
          {errors.icon && <p>{errors.icon.message}</p>}
          <br />
          <button
            type="submit"
            className="mt-5 border rounded px-4 py-2 text-black transition-all duration-300 hover:bg-slate-100 hover:ring-2 hover:ring-neutral-800"
          >
            新規登録
          </button>
        </form>
      </main>
    </>
  );
};
