"use client";

import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
} from "react-icons/fa";
import Image from "next/image";
import { US, TR } from "country-flag-icons/react/3x2";
import { useL10n } from "../../provider/l10n-provider";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDownIcon, Menu } from "lucide-react";
import homeChattoImage from "@/public/image/home-page-chatto.png";
import { Button } from "@base-ui/react";
import { twMerge } from "tailwind-merge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuPortal,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSub,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/src/components/ui/dropdown-menu";

function AppJumbotron({ className }: { className?: string }) {
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
    <div
      className={twMerge(
        "w-full h-[900px] p-3 bg-cover bg-center bg-no-repeat overflow-hidden",
        className,
      )}
      style={{
        backgroundImage: `url(${homeChattoImage.src})`,
      }}
    >
      <div className="sm:w-3/4 sm:grid sm:grid-cols-3 mx-auto flex flex-row w-full ">
        <div className="collapse  sm:visible flex flex-row items-center sm:gap-6 text-white">
          <FaInstagram size={16} />
          <FaFacebookF size={16} />
          <FaTwitter size={16} />
          <FaGooglePlusG size={18} />
        </div>
        <div
          className="flex w-full mx-auto items-center
          sm:justify-center justify-between align-middle "
        >
          <Image
            src="/image/hotel-logo.png"
            alt="Hotel Logo"
            width={100}
            height={100}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex text-white sm:hidden cursor-pointer">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem className="cursor-pointer">
                {t("home.home")}
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                {t("home.rooms_and_suites")}
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                {t("home.restaurant")}
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                {t("home.gallery")}
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                {t("home.blog")}
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                {t("home.about_us")}
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                {t("home.contact_us")}
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <div className="flex items-center justify-center gap-4 px-2 py-3 text-[#c7924f]">
                <FaInstagram size={16} className="cursor-pointer" />
                <FaFacebookF size={16} className="cursor-pointer" />
                <FaTwitter size={16} className="cursor-pointer" />
                <FaGooglePlusG size={18} className="cursor-pointer" />
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => changeLang(lang === "tr" ? "en" : "tr")}
              >
                <span className="flex items-center gap-2 cursor-pointer">
                  {lang === "tr" && <US className="w-5" />}
                  {lang === "en" && <TR className="w-5" />}
                  {lang === "tr" ? "English" : "Türkçe"}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div></div>
      </div>
      <ul className="collapse sm:visible flex items-center gap-8 mx-auto select-none w-full justify-center my-9 font-bold text-white text-xl">
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
        {t("home.our_rooms")}
      </h1>
      <div className="flex flex-row items-center gap-4 justify-center mt-6 w-3/5 mx-auto ">
        <hr className="w-full" />
        <ChevronDownIcon className="w-16  h-16 bold text-white" />
        <hr className="w-full" />
      </div>

      <div className="w-1/2 h-fit backdrop-blur-xs mx-auto border-solid border-orange-400 border-opacity-50 border-2 rounded-lg mt-10 p-6 text-center text-white">
        <div className="w-full h-fit text-3xl whitespace-pre-line">
          {t("home.jumbutron_card")}
        </div>
        <Button
          onMouseUp={() => {
            const segments = pathname.split("/");
            segments.push("/booking");
            router.push(segments.join("/"));
          }}
          className="w-fit h-fit p-3 bg-[#B98C5A] shadow-2xl rounded-xl cursor-pointer hover:bg-[#876035] mt-6 text-sm text-white font-bold  duration-300"
        >
          {t("home.book_now")}
        </Button>
      </div>
    </div>
  );
}

export { AppJumbotron };
