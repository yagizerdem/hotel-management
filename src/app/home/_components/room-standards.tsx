import {
  RefrigeratorIcon,
  SnowflakeIcon,
  SunIcon,
  TvIcon,
  WifiIcon,
  WindIcon,
  type LucideIcon,
} from "lucide-react";

const standards: { icon: LucideIcon; name: string; note: string }[] = [
  { icon: SnowflakeIcon, name: "Klima", note: "Tüm odalarda" },
  { icon: TvIcon, name: "Televizyon", note: "Tüm odalarda" },
  { icon: WindIcon, name: "Saç kurutma makinesi", note: "Tüm odalarda" },
  { icon: WifiIcon, name: "Kablosuz internet", note: "Tüm odalarda" },
  { icon: RefrigeratorIcon, name: "Minibar", note: "Tek kişilik odalar hariç" },
  { icon: SunIcon, name: "Balkon", note: "3. ve 4. kat odalarında" },
];

export function RoomStandards() {
  return (
    <section
      id="olanaklar"
      className="mx-auto max-w-6xl scroll-mt-16 px-4 pb-24 sm:px-6"
    >
      <h2 className="border-b border-pine/10 pb-6 font-[family-name:var(--font-bodoni)] text-3xl">
        Her odada standart
      </h2>
      <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
        {standards.map(({ icon: Icon, name, note }) => (
          <li key={name} className="flex gap-3">
            <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-aegean" />
            <span>
              <span className="block font-medium">{name}</span>
              <span className="block text-sm text-pine/65">{note}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
