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
import { OTPInput } from "./OTPinput";

export function FormationDialogue() {
  const [showRightHalf, setShowRightHalf] = useState(false);

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a formation</DialogTitle>
            <DialogDescription>
              Set up your formation. Make sure the total number of players is
              exactly 10.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            {/* LEFT HALF */}
            <div className="grid gap-3">
              <Label>LEFT HALF</Label>
              <OTPInput />
            </div>

            {/* CHECKBOX */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="right-half"
                checked={showRightHalf}
                onCheckedChange={(checked) =>
                  setShowRightHalf(Boolean(checked))
                }
              />
              <Label htmlFor="right-half">Setup RIGHT HALF?</Label>
            </div>

            {/* CONDITIONAL RIGHT HALF */}
            {showRightHalf && (
              <div className="grid gap-3">
                <Label>RIGHT HALF</Label>
                <OTPInput />
              </div>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
