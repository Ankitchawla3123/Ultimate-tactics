"use client";

import * as React from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function OTPInput({ setVal, setValid, setColor, DefaultColor }) {
  const MAX_LENGTH = 7;
  const MIN_SLOTS = 2;
  const [value, setValue] = React.useState("");
  const [visibleSlots, setVisibleSlots] = React.useState(MIN_SLOTS);
  const [error, setError] = React.useState("");
  const [color, setColorState] = React.useState(DefaultColor);

  const isDigit = (char) => /^[1-9]$/.test(char);

  const computeSum = (val) =>
    [...val].reduce((sum, digit) => sum + parseInt(digit, 10), 0);

  const handleChange = (newVal) => {
    const currentSum = computeSum(value);
    if (currentSum === 10 && newVal.length > value.length) {
      return;
    }

    const digits = [...newVal].filter((char) => isDigit(char));
    const joinedDigits = digits.join("");
    const currentLength = digits.length;
    const sum = computeSum(joinedDigits);
    const isValid = sum === 10;

    if (sum > 10) {
      setError("Only 10 players could be set");
      setValid(false);
      return;
    }

    if (isValid) {
      setVisibleSlots(currentLength);
      setError("");
      setValid(true);
    } else {
      const newVisible = Math.min(currentLength + 1, MAX_LENGTH);
      setVisibleSlots(Math.max(newVisible, MIN_SLOTS));
      setError("Only 10 players could be set");
      setValid(false);
    }

    setValue(joinedDigits);
    setVal(joinedDigits);
  };

  const handleColorChange = (e) => {
    const selectedColor = e.target.value;
    setColorState(selectedColor);
    if (setColor) setColor(selectedColor);
  };

  return (
    <div className="space-y-2 relative">
      <div className="flex items-center">
        {/* OTP Input */}
        <InputOTP maxLength={MAX_LENGTH} value={value} onChange={handleChange}>
          <InputOTPGroup>
            {[...Array(visibleSlots)].map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <div className="ml-4">
          <label className="flex items-center gap-2 text-sm">
            <span className="font-medium">Color:</span>
            <input
              type="color"
              value={color}
              onChange={handleColorChange}
              className="w-6 h-6 p-0 border-none cursor-pointer"
            />
          </label>
        </div>
      </div>

      <div className="text-sm text-center mt-1">
        {value === "" ? (
          <span>Set up your formation (10 players).</span>
        ) : (
          <span
            className={
              error ? "text-red-600 font-medium" : "text-green-600 font-medium"
            }
          >
            {error || "Valid Formation ✅"}
          </span>
        )}
      </div>
    </div>
  );
}
