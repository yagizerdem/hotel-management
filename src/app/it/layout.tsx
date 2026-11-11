import type { Metadata } from "next";
import { homeFontClassName } from "@/src/app/home/lib/fonts";
import { ItMobileBar, ItSidebar } from "@/src/app/it/components/it-sidebar";
import { currentUser } from "@/src/app/it/data/sample";

export const metadata: Metadata = {
  title: "IT panel, Bilge Hotel",
  robots: { index: false, follow: false },
};

// Only the IT specialist uses this panel; access checks belong here once the
// backend is in place (role "it_admin").
export default function ItLayout({ children }: LayoutProps<"/it">) {
  return (
    <div
      lang="en"
      className={`${homeFontClassName} flex min-h-dvh flex-1 bg-background text-foreground`}
    >
      <ItSidebar user={currentUser} />
      <div className="flex min-w-0 flex-1 flex-col">
        <ItMobileBar user={currentUser} />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-8 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
