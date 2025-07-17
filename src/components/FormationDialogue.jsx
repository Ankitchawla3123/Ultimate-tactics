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
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { OTPInput } from "./index";

export function FormationDialogue({ setformation }) {
  const [dialogOpen, setDialogOpen] = useState(false); // controls the Dialog
  const [showLeftHalf, setShowLeftHalf] = useState(true);
  const [showRightHalf, setShowRightHalf] = useState(false);

  const [LeftHalf, setLeftHalf] = useState("");
  const [RightHalf, setRightHalf] = useState("");

  const [leftValid, setleftValid] = useState(false);
  const [rightValid, setrightValid] = useState(false);

  const [leftColor, setLeftColor] = useState("#ff0000");
  const [rightColor, setRightColor] = useState("#0000ff");

  const reset = () => {
    setShowLeftHalf(true);
    setShowRightHalf(false);
    setLeftHalf("");
    setRightHalf("");
    setleftValid(false);
    setrightValid(false);
    setLeftColor("#ff0000");
    setRightColor("#0000ff");
  };

  const handleSubmit = () => {
    if ((showLeftHalf && !leftValid) || (showRightHalf && !rightValid)) {
      alert("Please complete a valid formation.");
      return;
    }

    const finalFormation = {
      left: showLeftHalf ? LeftHalf : null,
      right: showRightHalf ? RightHalf : null,
      leftColor: showLeftHalf ? leftColor : null,
      rightColor: showRightHalf ? rightColor : null,
    };

    setformation(finalFormation);
    reset();
    setDialogOpen(false);
  };

  const isSubmitDisabled =
    (!showLeftHalf && !showRightHalf) ||
    (showLeftHalf && !leftValid) ||
    (showRightHalf && !rightValid);

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className=" select-none px-2 h-9 focus-visible:ring-0 focus-visible:outline-none focus-visible:shadow-none"
            variant="outline"
          >
            Add Formation
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <form>
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
              {/* LEFT HALF */}
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
                      setLeftColor("#ff0000");
                    }
                  }}
                />
                <Label htmlFor="left-half">Setup LEFT HALF?</Label>
              </div>

              {showLeftHalf && (
                <div className="grid gap-1">
                  <Label>LEFT HALF</Label>
                  <OTPInput
                    setVal={setLeftHalf}
                    setValid={setleftValid}
                    setColor={setLeftColor}
                    DefaultColor={leftColor}
                  />
                </div>
              )}

              {/* RIGHT HALF */}
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
                      setRightColor("#0000ff");
                    }
                  }}
                />
                <Label htmlFor="right-half">Setup RIGHT HALF?</Label>
              </div>

              {showRightHalf && (
                <div className="grid gap-1">
                  <Label>RIGHT HALF</Label>
                  <OTPInput
                    setVal={setRightHalf}
                    setValid={setrightValid}
                    setColor={setRightColor}
                    DefaultColor={rightColor}
                  />
                </div>
              )}
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button onClick={reset} variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" disabled={isSubmitDisabled}>
                    Add Formation
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      This will clear all players.
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to add this new formation? All
                      existing players will be removed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
