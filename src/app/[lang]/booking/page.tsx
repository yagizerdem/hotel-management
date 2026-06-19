import Image from "next/image";
import Header from "./header";
import logoPng from "@/public/image/hotel-logo.png";
import { SearchBar } from "./searchbar";
import { RoomList } from "./room-list";
import ReservationSummary from "./reservation-summary";
import { Footer } from "../app-footer";
import { ScrollToTop } from "../../../components/shared/scroll-to-top";

export default function BookingPage() {
  return (
    <div className="w-full mx-auto h-full flex items-center justify-center flex-col">
      <div className="w-1/2 mx-auto h-full flex items-center justify-center flex-col">
        <Header />
        <Image src={logoPng} alt="Hotel Logo" className="w-32" />
        <SearchBar />
      </div>
      <div className="w-3/4 h-fit flex flex-row gap-5">
        <RoomList className="w-full" />
        <ReservationSummary />
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
