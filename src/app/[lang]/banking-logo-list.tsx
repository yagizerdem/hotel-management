import bankListLogo from "@/public/image/home/banking-logo-list.png";
import Image from "next/image";

export function BankingLogoList() {
  return (
    <Image
      src={bankListLogo}
      alt="Banking Logo List"
      className="w-full h-auto"
    />
  );
}
