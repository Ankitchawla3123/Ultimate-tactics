import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropMenu2({ placeholder, label, options, Default, onChange }) {
  const [selectedoption, setselectedoption] = React.useState(Default);

  React.useEffect(() => {
    if (onChange) {
      onChange(selectedoption);
    }
  }, [selectedoption, onChange]);

  const selectedItem = options.find((opt) => opt.value === selectedoption);
  const displayText = selectedItem ? selectedItem.placeholder : placeholder;

  return (
    <DropdownMenu className="w-auto">
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className=" px-1 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:shadow-none "
        >
          {displayText}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedoption}
          onValueChange={setselectedoption}
        >
          {options.map((opt, i) => (
            <DropdownMenuRadioItem key={i} value={opt.value}>
              {opt.placeholder}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
