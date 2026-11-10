export default function HomePage() {
  console.log("Home Page Loaded", process.env.MONGODB_URI);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}
