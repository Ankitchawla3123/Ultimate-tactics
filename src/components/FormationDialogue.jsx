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
  const [showLeftHalf, setShowLeftHalf] = useState(true);
  const [showRightHalf, setShowRightHalf] = useState(false);

  const [LeftHalf, setLeftHalf] = useState("");
  const [RightHalf, setRightHalf] = useState("");
  const [leftValid, setleftValid] = useState(false);
  const [rightValid, setrightValid] = useState(false);

  const reset = () => {
    setShowLeftHalf(true);
    setShowRightHalf(false);
    setLeftHalf("");
    setRightHalf("");
    setleftValid(false);
    setrightValid(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ((showLeftHalf && !leftValid) || (showRightHalf && !rightValid)) {
      alert("Please complete a valid formation.");
      return;
    }

    const finalFormation = {
      left: showLeftHalf ? LeftHalf : null,
      right: showRightHalf ? RightHalf : null,
    };

    console.log("✅ Submitted Formation:", finalFormation);
    reset();
  };
  const isSubmitDisabled =
    (!showLeftHalf && !showRightHalf) || // New condition added
    (showLeftHalf && !leftValid) ||
    (showRightHalf && !rightValid);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) reset(); // only reset when opening, not on close
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="text-xs sm:text-sm md:text-base px-2 h-auto"
          variant="outline"
        >
          Add Formation
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-4">
            <DialogTitle>Add a formation</DialogTitle>
            <DialogDescription>
              Set up your formation—whether it's a classic 4-3-3 or your own
              custom style.
              <br />
              <strong>Note:</strong> Adding a new formation will reset all
              players.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            {/* LEFT HALF Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="left-half"
                checked={showLeftHalf}
                onCheckedChange={(checked) => {
                  const isChecked = Boolean(checked);
                  setShowLeftHalf(isChecked);
                  if (!isChecked) {
                    setLeftHalf("");
                    setleftValid(false);
                  }
                }}
              />
              <Label htmlFor="left-half">Setup LEFT HALF?</Label>
            </div>

            {/* LEFT HALF OTP */}
            {showLeftHalf && (
              <div className="grid gap-1">
                <Label>LEFT HALF</Label>
                <OTPInput setValid={setleftValid} setVal={setLeftHalf} />
              </div>
            )}

            {/* RIGHT HALF Checkbox */}
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

            {/* RIGHT HALF OTP */}
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
              <Button type="submit" disabled={isSubmitDisabled}>
                Add Formation
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
