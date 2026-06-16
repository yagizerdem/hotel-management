import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
} from "react-icons/fa";
import Image from "next/image";
import { Flag } from "lucide-react";
import { US, TR } from "country-flag-icons/react/3x2";

function AppJumbotron() {
  const navItemClass =
    "relative cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full";

  return (
    <div className="bg-[#c29a5c] w-full h-96 p-3">
      <div className="w-3/4 grid grid-cols-3 mx-auto ">
        <div className="flex flex-row items-center gap-6 text-white">
          <FaInstagram size={16} />
          <FaFacebookF size={16} />
          <FaTwitter size={16} />
          <FaGooglePlusG size={18} />
        </div>
        <div className="flex items-center justify-center align-middle">
          <Image
            src="/image/hotel-logo.png"
            alt="Hotel Logo"
            width={100}
            height={100}
          />
        </div>
        <div></div>
      </div>
      <ul className="flex items-center gap-8 mx-auto w-full justify-center my-9 font-bold text-white text-xl">
        <li className={navItemClass}>Home</li>
        <li className={navItemClass}>Rooms and Suites</li>
        <li className={navItemClass}>Restaurant</li>
        <li className={navItemClass}>Gallery</li>
        <li className={navItemClass}>Blog</li>
        <li className={navItemClass}>About Us</li>
        <li className={navItemClass}>Contact Us</li>
        <li className={navItemClass}>
          <TR className="w-5" />
        </li>
      </ul>
    </div>
  );
}

export { AppJumbotron };
