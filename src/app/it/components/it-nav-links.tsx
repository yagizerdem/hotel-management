"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActive, itNav } from "@/src/app/it/lib/nav";

/** The panel's sections. Used in the sidebar and in the mobile menu. */
export function ItNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-0.5">
      {itNav.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`flex h-10 items-center gap-3 rounded-sm border-l-2 px-3 text-sm transition-colors focus-visible:ring-3 focus-visible:ring-secondary/40 focus-visible:outline-none ${
                active
                  ? "border-[#89d0f1] bg-white/10 text-[#eef1ec]"
                  : "border-transparent text-[#eef1ec]/70 hover:bg-white/5 hover:text-[#eef1ec]"
              }`}
            >
              <Icon aria-hidden className="size-4 shrink-0" />
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
