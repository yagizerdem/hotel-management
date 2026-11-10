import type { Metadata } from "next";
import { homeFontClassName } from "@/src/app/home/lib/fonts";
import { SiteHeader } from "@/src/app/home/components/site-header";
import { SiteFooter } from "@/src/app/home/components/site-footer";

export const metadata: Metadata = {
  title: "Bilge Hotel, Kemer",
  description:
    "Bilge Hotel, a 5-star hotel in Kemer. See available rooms and save up to 23% when you book early online.",
};

export default function HomeLayout({ children }: LayoutProps<"/home">) {
  return (
    <div
      lang="en"
      className={`${homeFontClassName} flex min-h-full flex-1 flex-col bg-background text-foreground`}
    >
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
