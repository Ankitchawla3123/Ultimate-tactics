import { cn } from "../lib/utils";
import logoUrl from "./logo2.svg"; // Make sure logo.svg is in the same folder

export const Logo = ({ className }) => {
  return (
    <img
      src={logoUrl}
      alt="Logo"
      className={cn("w-auto h-8", className)}
      draggable={false}
    />
  );
};
