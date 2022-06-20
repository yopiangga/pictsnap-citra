import LayoutDashboard from "layouts/dashboard";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { FaUpload } from "react-icons/fa";
import { updateTexture } from "services/TextureServices";
import { AppContext } from "context/state";
import { Router, useRouter } from "next/router";
import { FiDownload, FiHeart } from "react-icons/fi";

export default function TemplateDetail() {
  const { user, setUser, token, setToken } = useContext(AppContext);
  const [item, setItem] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const { id } = useRouter().query;
  useEffect(() => {
    if (user == null) Router.push("/auth/login");
  }, []);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/get-image/${id}`)
      .then(function (response) {
        setItem(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <LayoutDashboard menuActive="0" title="Template Detail">
      <div className="overflow-auto h-screen pb-24 px-4 md:px-6">
        <div className="my-6 w-full space-y-4 md:space-x-4 md:space-y-0 flex-col md:flex-row">
          <div className="mb-6"></div>
          <section className="bg-gray-100">
            <div className="max-w-screen-xl px-4  mx-auto sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                <div className="p-8 bg-white rounded-lg shadow-lg lg:p-4 lg:col-span-3">
                  <img src={`${item[3]}`} alt="image" className="w-full" />
                </div>
                <div className="w-full col-span-2">
                  <h2 className="font-bold text-4xl">{`${item[4]}`}</h2>
                  <p className="mt-8">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Hic, provident!
                  </p>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => {}}
                      className="w-fit flex items-center gap-2 py-1 pl-5 pr-5 bg-gray-900 text-gray-100 text-md rounded-lg border-4 focus:border-orange-300 border-transparent"
                    >
                      <FiHeart />
                      Like
                    </button>
                    <a
                      href={item[3]}
                      target="_blank"
                      download
                      rel="noreferrer"
                      className="w-fit flex items-center gap-2 py-1 pl-5 pr-5 bg-orange-500 text-gray-100 text-md rounded-lg border-4 focus:border-orange-300 border-transparent"
                    >
                      <FiDownload />
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </LayoutDashboard>
  );
}
