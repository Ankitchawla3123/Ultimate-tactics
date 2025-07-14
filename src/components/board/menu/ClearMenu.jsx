import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../../ui/button";
Button;
export function ClearMenu({ placeholder, Default, onChange }) {
  const label = "Clear Options";
  const options = [
    {
      value: "lines",
      placeholder: "Lines",
      variant: "ghost",
    },
    {
      value: "polygons",
      placeholder: "Polygons",
      variant: "ghost",
    },
    {
      value: "players",
      placeholder: "Players",
      variant: "ghost",
    },
    {
      value: "all",
      placeholder: "Clear All",
      variant: "destructive",
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className=" p-2 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:shadow-none "
          variant="destructive"
        >
          Clear
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto">
        <DropdownMenuLabel className=" text-center">{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((opt, index) => (
          <DropdownMenuItem className="p-0" key={index} asChild>
            <div className="flex justify-center">
              <Button className="w-full" variant={opt.variant}>
                {opt.placeholder}
              </Button>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
