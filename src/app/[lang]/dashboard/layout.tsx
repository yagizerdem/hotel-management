import DefaultLayout from "@/src/layout/default-layout";

export default async function BookingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DefaultLayout>
      <div className="admin-area w-screen h-screen flex flex-col overflow-hidden">
        {children}
      </div>
    </DefaultLayout>
  );
}
