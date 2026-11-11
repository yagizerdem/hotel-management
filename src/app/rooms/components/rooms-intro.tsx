type RoomsIntroProps = {
  roomCount: number;
  floorCount: number;
};

export function RoomsIntro({ roomCount, floorCount }: RoomsIntroProps) {
  return (
    <header className="mx-auto grid max-w-6xl gap-6 px-4 pt-16 pb-10 sm:px-6 md:grid-cols-[1fr_auto] md:items-end md:pt-24">
      <div>
        <h1 className="font-[family-name:var(--font-bodoni)] text-5xl leading-[1.05] sm:text-6xl">
          All rooms at Bilge Hotel
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground/75">
          Every room across our floors, with its beds, amenities and nightly
          rate. Filter by floor or room type to find the one that suits your
          stay.
        </p>
      </div>
      {roomCount > 0 && (
        <p className="text-foreground/70 md:text-right">
          <span className="font-[family-name:var(--font-bodoni)] text-4xl text-foreground">
            {roomCount}
          </span>{" "}
          rooms on {floorCount} {floorCount === 1 ? "floor" : "floors"}
        </p>
      )}
    </header>
  );
}
