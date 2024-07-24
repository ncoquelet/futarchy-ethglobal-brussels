"use client";

import { PropsWithChildren } from "react";
import { Header } from "@/components/layout/Header";

const GlobalTemplate = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default GlobalTemplate;
