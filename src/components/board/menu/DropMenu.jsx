import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function DropMenu({ placeholder, label, options, Default, onChange }) {
  const [selectedOption, setSelectedOption] = useState(Default);
  const shortscreen = useSelector((state) => state.board.shortscreen);

  useEffect(() => {
    if (onChange) {
      onChange(selectedOption);
    }
  }, [selectedOption, onChange]);

  return (
    <Select
      value={selectedOption}
      onValueChange={(value) => {
        setSelectedOption(value);
      }}
    >
      <SelectTrigger
        className={`${
          shortscreen ? "w-12" : "w-auto"
        } h-8 focus:outline-none focus:ring-0 focus:ring-offset-0`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((opt, i) => (
            <SelectItem key={i} value={opt.value}>
              {opt.placeholder}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
