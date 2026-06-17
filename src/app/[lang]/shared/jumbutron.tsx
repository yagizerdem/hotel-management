"use client";

import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
} from "react-icons/fa";
import Image from "next/image";
import { US, TR } from "country-flag-icons/react/3x2";
import { useL10n } from "../../../provider/l10n-provider";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDownIcon } from "lucide-react";

function Jumbotron({
  className,
  jumbutronTitle,
}: {
  className?: string;
  jumbutronTitle: string;
}) {
  const { t, lang } = useL10n();
  const router = useRouter();
  const pathname = usePathname();

  function changeLang(nextLang: "en" | "tr") {
    const segments = pathname.split("/");
    segments[1] = nextLang;

    router.push(segments.join("/"));
  }

  const navItemClass =
    "relative cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full";

  return (
    <div className="bg-[#c29a5c] w-full h-104 p-3">
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
      <ul className="flex items-center gap-8 mx-auto select-none w-full justify-center my-9 font-bold text-white text-xl">
        <li className={navItemClass}>{t("home.home")}</li>
        <li className={navItemClass}>{t("home.rooms_and_suites")}</li>
        <li className={navItemClass}>{t("home.restaurant")}</li>
        <li className={navItemClass}>{t("home.gallery")}</li>
        <li className={navItemClass}>{t("home.blog")}</li>
        <li className={navItemClass}>{t("home.about_us")}</li>
        <li className={navItemClass}>{t("home.contact_us")}</li>
        <li
          className={navItemClass}
          onClick={() => changeLang(lang === "tr" ? "en" : "tr")}
        >
          {lang === "tr" && <US className="w-5" />}
          {lang === "en" && <TR className="w-5" />}
        </li>
      </ul>
      <br />
      <hr className="w-full border-0 h-px bg-white/30 mb-4" />
      <h1 className="text-4xl text-center text-white font-bold">
        {jumbutronTitle}
      </h1>
      <div className="flex flex-row items-center gap-4 justify-center mt-6 w-3/5 mx-auto ">
        <hr className="w-full" />
        <ChevronDownIcon className="w-16  h-16 bold text-white" />
        <hr className="w-full" />
      </div>
    </div>
  );
}

export { Jumbotron };
