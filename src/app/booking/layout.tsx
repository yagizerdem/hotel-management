import { homeFontClassName } from "@/src/app/home/lib/fonts";
import { SiteHeader } from "@/src/app/home/components/site-header";
import { SiteFooter } from "@/src/app/home/components/site-footer";

export default function BookingLayout({ children }: LayoutProps<"/booking">) {
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
