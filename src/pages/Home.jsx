import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { url } from "../const";
import { useCookies } from "react-cookie";

export const Home = () => {
  const [cookies] = useCookies();
  const [bookLists, setBookLists] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    axios
      .get(`${url}/books?offset=0`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setBookLists(res.data);
      })
      .catch((error) => {
        setErrorMessage(`書籍の取得に失敗しました。${error}`);
      });
  }, []);

  return (
    <>
      <Header />
      <h2 className="flex justify-center text-2xl mb-5">書籍レビューリスト</h2>
      <ul>
        {bookLists.map((book, id) => {
          return (
            <li key={id}>
              <div className="mb-2 mx-auto max-w-md rounded-lg bg-white shadow">
                <div className="p-4">
                  <h3 className="text-xl font-medium text-gray-900">
                    {book.title}
                  </h3>
                  <a
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                    href={book.url}
                  >
                    URL
                  </a>
                  <p className="mt-1 text-gray-500">書籍詳細：{book.detail}</p>
                  <p className="mt-1 text-gray-500">レビュー：{book.review}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
