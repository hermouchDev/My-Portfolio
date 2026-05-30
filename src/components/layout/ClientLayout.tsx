"use client";

import { useState } from "react";
import { Loader } from "@/components/layout/Loader";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      {!loaderDone && (
        <Loader onComplete={() => setLoaderDone(true)} />
      )}
      {children}
    </>
  );
}
