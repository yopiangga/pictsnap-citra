import LayoutDashboard from "layouts/dashboard";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { AppContext } from "context/state";
import Router from "next/router";

export default function Profile() {
  const { user, setUser, token, setToken } = useContext(AppContext);

  useEffect(() => {
    if (user == null) Router.push("/auth/login");
  }, []);

  return (
    <LayoutDashboard menuActive="6" title="Profile">
      <div className="overflow-auto scrollbar-hide h-screen pb-24 px-4 md:px-6">
        <div className="flex flex-col items-center">
          <img
            className="w-12 md:w-auto mt-8"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/centre_aligned_simple-Svg1.svg"
            alt="logo"
          />
          <h2 className="font-bold text-4xl mt-20">
            Because payments should be easy
          </h2>
          <p className="mt-8">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic,
            provident!
          </p>
        </div>

        <div className="grid grid-cols-1 mt-20">
          <img
            className="mx-auto"
            src={user?.exhibitor?.booth_textures[4].url}
            alt="image"
          />
        </div>

        <div className="grid grid-cols-1 mt-14">
          <img
            className="mx-auto"
            src={user?.exhibitor?.booth_textures[6].url}
            alt="image"
          />
        </div>

        <div className="grid grid-cols-5 gap-5 mt-14 mb-8">
          {/* {user?.exhibitor?.booth_textures?.map((texture, idx) => {
            return <img key={idx} className="" src={texture.url} alt="image" />;
          })} */}

          <img
            className="my-auto"
            src={user?.exhibitor?.booth_textures[2].url}
            alt="image"
          />
          <img
            className="my-auto"
            src={user?.exhibitor?.booth_textures[0].url}
            alt="image"
          />
          <img
            className="my-auto"
            src={user?.exhibitor?.booth_textures[5].url}
            alt="image"
          />
          <img
            className="my-auto"
            src={user?.exhibitor?.booth_textures[1].url}
            alt="image"
          />
          <img
            className="my-auto"
            src={user?.exhibitor?.booth_textures[3].url}
            alt="image"
          />
        </div>
      </div>
    </LayoutDashboard>
  );
}
