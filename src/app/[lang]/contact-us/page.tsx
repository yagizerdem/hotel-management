"use client";

import { Footer } from "../app-footer";
import { MapPin } from "lucide-react";
import { Jumbotron } from "../shared/jumbutron";
import { useL10n } from "@/src/provider/l10n-provider";
import dividerSvg from "@/public/image/divider.svg";
import Image from "next/image";

export default function ContactUsPage() {
  const { t } = useL10n();

  return (
    <div className="w-full h-full mx-auto flex flex-col items-center justify-center gap-6 ">
      <Jumbotron jumbutronTitle={t("contact_us.jumbutron_title")} />
      <section className="w-full py-8 text-center font-serif text-black">
        <MapPin className="mx-auto mb-3 h-6 w-6 fill-[#b88a48] text-[#b88a48]" />
        <p className="mb-1 text-xs font-bold tracking-widest">ADDRESS</p>
        <p className="mb-5 text-2xl font-bold">
          Cami, Kavala Street No: 12, 34940 Tuzla/Istanbul
        </p>
        <p className="mb-5 text-2xl font-bold">Phone : (0216) 395 20 00</p>
        <p className="mb-5 text-2xl font-bold">Mobile : 0541 395 82 51</p>
        <p className="text-2xl font-bold">Mail : info@hotelchatto.com</p>
        <br /> <br />
        <Image src={dividerSvg} alt="divider" className="mx-auto" />
        <br /> <br />
        <div className="h-[300px] w-full overflow-hidden">
          <iframe
            title="Chatto Hotel Map"
            src="https://www.google.com/maps?q=Chatto%20Hotel%20Tuzla%20Istanbul&output=embed"
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
