"use client";

import * as React from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const AOSProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  React.useLayoutEffect(() => {
    AOS.init({
      duration: 600, // animation duration in ms
      once: true, // only animate once
    });
  }, []);

  return <>{children}</>;
};
