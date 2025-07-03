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
import { useDispatch } from "react-redux";

export function DropMenu({ placeholder, label, options, Default, onChange }) {
  const [selectedOption, setSelectedOption] = useState(Default);

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
      <SelectTrigger className="w-auto px-3">
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
