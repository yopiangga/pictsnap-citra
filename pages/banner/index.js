import LayoutDashboard from "layouts/dashboard";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { FaUpload } from "react-icons/fa";
import { updateTexture } from "services/TextureServices";
import { AppContext } from "context/state";
import Router from "next/router";

export default function Logo() {
  const { user, setUser, token, setToken } = useContext(AppContext);
  const [item, setItem] = useState();
  const [file1, setFile1] = useState();
  const [imagePreview1, setImagePreview1] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user == null) Router.push("/auth/login");
  }, []);

  const handleImageAsFile = (e) => {
    const file = e.target.files[0];
    var pattern = /image-*/;

    if (file.type.match(pattern)) {
      setFile1(e.target.files[0]);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview1(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);

      return;
    }
  };

  const handleChange = (event) => {
    setItem({
      ...item,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    if (item?.index == "" || file1 == null) {
      setLoading(false);
    } else {
      Push();
    }
  };

  async function Push() {
    await updateTexture(
      user.email + user.event_id + item.index,
      file1,
      () => setLoading(false),
      token
    );
  }

  return (
    <LayoutDashboard menuActive="5" title="Banner">
      <div className="overflow-auto h-screen pb-24 px-4 md:px-6">
        <div className="my-6 w-full space-y-4 md:space-x-4 md:space-y-0 flex-col md:flex-row">
          <div className="mb-6"></div>
          <section className="bg-gray-100">
            <div className="max-w-screen-xl px-4  mx-auto sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                <div className="p-8 bg-white rounded-lg shadow-lg lg:p-12 lg:col-span-3">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <label
                      htmlFor="image"
                      className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                    >
                      Banner Image
                    </label>

                    <div className="flex flex-col">
                      <div className="relative h-32">
                        <div className="border-2 border-dashed border-dark border-opacity-90 text-dark font-bold w-full h-32 rounded-xl flex flex-col justify-center items-center absolute z-0">
                          <FaUpload />
                          <p className="ml-2 mt-2 text-center break-all">
                            {file1 == null || file1 == undefined || file1 == ""
                              ? "Upload Image"
                              : file1.name}
                          </p>
                        </div>
                        <input
                          className="cursor-pointer w-full h-full opacity-0 pin-r pin-t absolute z-10"
                          type="file"
                          id="avatar1"
                          name="avatar1"
                          onChange={handleImageAsFile}
                          accept="image/png, image/jpeg"
                        />
                      </div>
                      {imagePreview1 ? (
                        <div className="w-full relative overflow-hidden mt-5">
                          <img
                            src={imagePreview1}
                            layout="fill"
                            alt="image-preview"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <label
                      htmlFor="input"
                      className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                    >
                      Index
                    </label>

                    <select
                      onChange={handleChange}
                      name="input"
                      id="input"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                    >
                      <option selected>Choose a value</option>
                      <option value="banner_1">Banner 1</option>
                      <option value="banner_2">Banner 2</option>
                    </select>

                    <div className="mt-10">
                      {loading ? (
                        <h4>Loading ....</h4>
                      ) : (
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center w-full px-5 py-3 text-white bg-black rounded-lg sm:w-auto"
                        >
                          <span className="font-medium"> Apply on Booth </span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 ml-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </LayoutDashboard>
  );
}
