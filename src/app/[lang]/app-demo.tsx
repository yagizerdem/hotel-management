export function AppDemo() {
  return (
    <div className="h-[800px] w-full bg-black">
      <iframe
        className="h-full w-full"
        src="https://www.youtube.com/embed/HnXrkZEaSJI?start=0&mute=2&loop=1&playlist=HnXrkZEaSJI"
        title="YouTube video"
        allow="encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
