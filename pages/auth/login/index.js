import { useState, useContext } from "react";
import Router from "next/router";
import { SignIn } from "services/AuthServices";
import { AppContext } from "context/state";
import { Loader } from "components/Loader";

export default function Login() {
  const { user, setUser, token, setToken, loading, setLoading } =
    useContext(AppContext);
  const [data, setData] = useState();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await SignIn(data, (res) => {
      setUser(res);
      setLoading(false);
      Router.push("/");
    });
  };

  return (
    <div className="bg-no-repeat bg-cover bg-center relative">
      {loading ? <Loader /> : ""}
      <div className="absolute bg-gradient-to-b from-white to-gray-50 opacity-100 inset-0 z-0"></div>
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
          <div className="self-start hidden lg:flex flex-col text-gray-900">
            <img src="" className="mb-3" />
            <h1 className="mb-3 font-bold text-5xl">
              Hi 👋 Welcome Back Exhibitor{" "}
            </h1>
            <p className="pr-3">PictSnap Next 1.0</p>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <form onSubmit={handleSubmit}>
            <div className="p-12 bg-white shadow-lg mx-auto rounded-2xl w-100 ">
              <div className="mb-4">
                <h3 className="font-semibold text-2xl text-gray-800">
                  Sign <span className="text-orange-400">in</span>
                </h3>
                <p className="text-gray-500">Please sign in to your account.</p>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    Email
                  </label>
                  <input
                    className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
                    type="email"
                    name="email"
                    value={data?.email}
                    onChange={handleChange}
                    placeholder="mail@gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                    Password
                  </label>
                  <input
                    className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
                    type="password"
                    name="password"
                    value={data?.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    Event ID
                  </label>
                  <input
                    className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
                    type="text"
                    name="event_id"
                    value={data?.event_id}
                    onChange={handleChange}
                    placeholder="pensfest"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-orange-400  hover:bg-orange-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Sign in
                  </button>
                </div>
              </div>
              <div className="pt-5 text-center text-gray-400 text-xs">
                <span>
                  Copyright © 2022
                  <a
                    href="https://codepen.io/uidesignhub"
                    className="text-orange hover:text-orange-500 "
                  ></a>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
