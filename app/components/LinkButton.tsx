import { type ComponentProps, type ReactNode } from "react";
import { ChevronRightIcon } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/app/utils/cn";
import Link from "fumadocs-core/link";

/**
 * For safe, Won't accept all props from Link
 */
export function LinkButton({
  variant = "secondary",
  icon,
  children,
  ...props
}: {
  icon?: ReactNode;
  variant?: "secondary" | "primary";
} & ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        buttonVariants({ color: variant ?? "secondary" }),
        icon != null ? "px-6" : "pl-7 pr-5",
        props.className,
      )}
    >
      {icon} {children}
      {icon == null && <ChevronRightIcon className="h-4 w-4" />}
    </Link>
  );
}