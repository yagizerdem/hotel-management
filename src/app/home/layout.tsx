import type { Metadata } from "next";
import { homeFontClassName } from "./_lib/fonts";
import { SiteHeader } from "./_components/site-header";
import { SiteFooter } from "./_components/site-footer";

export const metadata: Metadata = {
  title: "Bilge Hotel, Kemer",
  description:
    "Kemer'de 5 yıldızlı Bilge Hotel. Boş odaları görün, internetten erken rezervasyonla %23'e varan indirim alın.",
};

export default function HomeLayout({ children }: LayoutProps<"/home">) {
  return (
    <div
      lang="tr"
      className={`${homeFontClassName} flex min-h-full flex-1 flex-col bg-limestone text-pine`}
    >
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
