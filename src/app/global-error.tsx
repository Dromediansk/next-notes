"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html>
      <body>
        <h2>Oops. Something went wrong.</h2>
        <button className="bg-main py-2 px-4 rounded" onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  );
}
