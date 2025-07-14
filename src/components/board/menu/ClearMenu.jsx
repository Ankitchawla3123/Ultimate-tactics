import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { Button } from "../../ui/button";
import { useState } from "react";

export function ClearMenu({ options, onChange }) {
  const [selected, setSelected] = useState(null);
  const label = "Clear Options";

  const handleConfirm = (value) => {
    onChange(value);
    setSelected(null);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="p-2 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:shadow-none"
          variant="destructive"
        >
          Clear
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto">
        <DropdownMenuLabel className="text-center">{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((opt, index) => (
          <DropdownMenuItem className="p-0" key={index} asChild>
            <div className="flex justify-center w-full">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="w-full"
                    variant={opt.variant}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(opt);
                    }}
                  >
                    {opt.placeholder}
                  </Button>
                </AlertDialogTrigger>
                {selected?.value === opt.value && (
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Do you want to clear {opt.value}?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {opt.value === "all"
                          ? "This action cannot be undone. It will remove all items."
                          : `This action cannot be undone. It will permanently remove all ${opt.placeholder.toLowerCase()}.`}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setSelected(null)}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleConfirm(opt.value)}
                      >
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                )}
              </AlertDialog>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
