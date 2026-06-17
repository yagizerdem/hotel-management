"use client";

import { useL10n } from "@/src/provider/l10n-provider";
import Image from "next/image";
import {
  FaInstagram,
  FaFacebookF,
  FaGooglePlusG,
  FaTwitter,
} from "react-icons/fa";
import hotelLogo from "@/public/image/hotel-logo.png";

export function Footer() {
  const { t } = useL10n();

  return (
    <footer className="w-full bg-[#f3eee8] h-64">
      <div className="flex h-[220px] items-center justify-center">
        <Image
          src={hotelLogo}
          alt="Hotel Chatto"
          width={100}
          height={100}
          className="object-contain"
        />
      </div>

      <div className="border-t border-black/60">
        <div className="mx-auto grid h-[70px] max-w-[1000px] grid-cols-3 items-center px-4 text-xs text-slate-600">
          <p>© 2026 Tuzla Otelleri - Hotel Chatto</p>

          <div className="flex justify-center gap-5 text-black">
            <FaInstagram size={13} />
            <FaFacebookF size={13} />
            <FaGooglePlusG size={13} />
            <FaTwitter size={13} />
          </div>

          <p className="text-right text-black">{t("home.tuzla_hotel")}</p>
        </div>
      </div>
    </footer>
  );
}
