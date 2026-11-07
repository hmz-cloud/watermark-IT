import clsx from "clsx";
import type { ComponentProps } from "react";

/** Centered page column with responsive gutters (16px on phones). */
export function Container({ className, ...rest }: ComponentProps<"div">) {
  return <div className={clsx("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...rest} />;
}
