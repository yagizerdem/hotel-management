"use client";

import { Fragment } from "react/jsx-runtime";
import { useApp } from "../provider/app-provider";
import { AppLoader } from "../components/shared/app-spinner";

function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading } = useApp();

  return (
    <Fragment>
      {isLoading && (
        <div className="w-full fixed z-100 h-full top-0 left-0 flex items-center justify-center  ">
          <div className="absolute z-1 top-0 left-0 bg-black inset-0 opacity-90"></div>
          <div className="absolute top-1/2 left-1/2 z-50 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2">
            <AppLoader />
          </div>
        </div>
      )}
      {children}
    </Fragment>
  );
}

export default DefaultLayout;
