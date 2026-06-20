import DefaultLayout from "@/src/layout/default-layout";

export default async function BookingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
