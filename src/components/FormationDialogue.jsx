"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { OTPInput } from "./index";

export function FormationDialogue() {
  const [showRightHalf, setShowRightHalf] = useState(false);
  const [LeftHalf, setLeftHalf] = useState("");
  const [RightHalf, setRightHalf] = useState("");
  const [leftValid, setleftValid] = useState(false);
  const [rightValid, setrightValid] = useState(false);

  const reset = () => {
    setLeftHalf("");
    setRightHalf("");
    setleftValid(false);
    setrightValid(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!leftValid || (showRightHalf && !rightValid)) {
      alert("Please complete a valid formation.");
      return;
    }

    const finalFormation = {
      left: LeftHalf,
      right: showRightHalf ? RightHalf : null,
    };

    reset();
    console.log("✅ Submitted Formation:", finalFormation);
  };

  return (
    <Dialog onOpenChange={reset}>
      <DialogTrigger asChild>
        <Button
          className="text-xs sm:text-sm md:text-base px-2"
          variant="outline"
        >
          Open Dialog
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-4">
            <DialogTitle>Add a formation</DialogTitle>
            <DialogDescription>
              Whether it’s 4-3-3 or your own custom style, set your formation
              your way.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label>LEFT HALF</Label>
              <OTPInput setValid={setleftValid} setVal={setLeftHalf} />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="right-half"
                checked={showRightHalf}
                onCheckedChange={(checked) => {
                  const isChecked = Boolean(checked);
                  setShowRightHalf(isChecked);
                  if (!isChecked) {
                    setRightHalf("");
                    setrightValid(false);
                  }
                }}
              />
              <Label htmlFor="right-half">Setup RIGHT HALF?</Label>
            </div>

            {showRightHalf && (
              <div className="grid gap-1">
                <Label>RIGHT HALF</Label>
                <OTPInput setValid={setrightValid} setVal={setRightHalf} />
              </div>
            )}
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button onClick={reset} variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                disabled={!leftValid || (showRightHalf && !rightValid)}
              >
                Add Formation
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
