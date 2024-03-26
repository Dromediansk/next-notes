"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-full flex items-center justify-center gap-10 flex-col">
      <h2 className="text-xl text-center">
        Uh-oh! It looks like there&apos;s a glitch in organizing your notes.
        <br />
        We&apos;re working to tidy things up.
      </h2>

      <Image
        src="/assets/error.svg"
        alt="error"
        width="0"
        height="0"
        sizes="100vw"
        style={{ width: 300, height: "auto" }}
        priority
      />

      <div className="flex flex-col gap-4 items-center justify-center">
        <button className="bg-main py-2 px-4 rounded" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </div>
  );
}
