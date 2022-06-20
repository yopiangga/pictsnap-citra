import Image from "next/image";
import loader from "public/assets/images/loader.svg";

export function Loader() {
  return (
    <div className="absolute w-full h-full z-50 bg-black bg-opacity-10 flex justify-center items-center">
      <div className="w-96 h-96 relative">
        <Image src={loader} layout="fill" objectFit="contain" />
      </div>
    </div>
  );
}
