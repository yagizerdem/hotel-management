import { Footer } from "./app-footer";
import { HotelIntroSection } from "../app-hotel-intro-section";
import { BookingDiscountCard } from "./app-booking-discount-card";
import { AppDemo } from "./app-demo";
import { FeatureCatalog } from "./app-feature-catalog";
import { AppJumbotron } from "./app-jumbutron";
import { AppRoomsSuites } from "./app-rooms-suites";
import { BankingLogoList } from "./banking-logo-list";
import BookingFooter from "./booking-footer";
import DefaultLayout from "@/src/layout/default-layout";

export default async function Home() {
  return (
    <DefaultLayout>
      <div className="w-full h-full">
        <AppJumbotron />
        <BookingDiscountCard className="mx-auto my-20 md:my-[-50px] overflow-x-hidden" />
        <HotelIntroSection />
        <FeatureCatalog />
        <AppRoomsSuites />
        <AppDemo />
        <BankingLogoList />
        <Footer />
        <div className="pb-30"></div>
        <BookingFooter />
      </div>
    </DefaultLayout>
  );
}
