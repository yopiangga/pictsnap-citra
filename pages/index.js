import LayoutDashboard from "layouts/dashboard";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { AppContext } from "context/state";
import Router from "next/router";

export default function Home() {
  const { user, setUser, token, setToken } = useContext(AppContext);
  const [items, setItems] = useState([]);
  const [file, setFile] = useState();
  const [base64, setBase64] = useState("");
  const [imagePreview, setImagePreview] = useState(false);

  useEffect(() => {
    if (user == null) Router.push("/auth/login");
  }, []);

  useEffect(() => {
    axios
      .post("http://127.0.0.1:5000/get-image")
      .then(function (response) {
        setItems(response.data);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  const handleImageAsFile = (e) => {
    const file = e.target.files[0];
    var pattern = /image-*/;

    if (file.type.match(pattern)) {
      setFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setBase64(reader);
      // console.log(reader.result);
      return;
    }
  };

  function handleReset() {
    setFile(null);
    setBase64(null);
    setImagePreview(null);
    axios
      .post("http://127.0.0.1:5000/get-image")
      .then(function (response) {
        setItems(response.data);
        // console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  function handleSubmit() {
    // console.log(base64.result.replace("data:image/jpeg;base64,", ""));
    axios
      .post("http://127.0.0.1:5000/compare-all-image", {
        image1: base64.result,
      })
      .then(function (response) {
        setItems(response.data);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  return (
    <LayoutDashboard menuActive="0" title="Dashboard">
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

          <div className="w-96">
            <div className="relative h-32 mt-8">
              <div className="border-2 border-dashed border-dark border-opacity-90 text-dark font-bold w-full h-32 rounded-xl flex flex-col justify-center items-center absolute z-0">
                <FaUpload />
                <span className="ml-2 mt-2 w-96 text-center">
                  {file == null || file == undefined || file == ""
                    ? "Upload Image"
                    : file.name}
                </span>
              </div>
              <input
                className="cursor-pointer w-full h-40 opacity-0 pin-r pin-t absolute z-10"
                type="file"
                id="avatar"
                name="avatar"
                onChange={handleImageAsFile}
                accept="image/png, image/jpeg"
              />
            </div>
            {imagePreview ? (
              <div className="w-full relative overflow-hidden mt-5">
                <img src={imagePreview} layout="fill" alt="image-preview" />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex gap-6 mt-10">
            <button
              onClick={handleReset}
              className="w-full p-2 pl-5 pr-5 bg-gray-900 text-gray-100 text-lg rounded-lg border-4 focus:border-gray-600 border-transparent"
            >
              Reset
            </button>
            <button
              onClick={handleSubmit}
              className="w-full p-2 pl-5 pr-5 bg-orange-500 text-gray-100 text-lg rounded-lg border-4 focus:border-orange-300 border-transparent"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 mt-20 mb-8">
          {items.map((item, idx) => {
            return (
              <div key={idx} className="w-full">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  {item[2] == null || item[2] == undefined || item[2] == "" ? (
                    ""
                  ) : (
                    <img
                      src={`data:image/jpg;base64,${item[2]}`}
                      alt="image"
                      className="w-full"
                    />
                  )}
                  <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                    <h3>
                      <a
                        href=""
                        className="
                          font-semibold
                          text-dark text-xl
                          sm:text-[22px]
                          md:text-xl
                          lg:text-[22px]
                          xl:text-xl
                          2xl:text-[22px]
                          mb-4
                          block
                          hover:text-orange-500
                          "
                      >
                        50+ Best creative website themes & templates
                      </a>
                    </h3>
                    <p className="text-base text-body-color leading-relaxed mb-7">
                      Lorem ipsum dolor sit amet pretium consectetur adipiscing
                      elit. Lorem consectetur adipiscing elit.
                    </p>
                    {item[0] == "-" || item[1] == "-" ? (
                      ""
                    ) : (
                      <div className="flex gap-2 justify-center">
                        <div className="bg-orange-400 text-white rounded-full py-0.1 px-3">
                          <span>MSE : {parseFloat(item[0]).toFixed(2)}</span>
                        </div>
                        <div className="bg-green-400 text-white rounded-full py-0.1 px-3">
                          <span>SSIM : {parseFloat(item[1].toFixed(2))}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </LayoutDashboard>
  );
}
