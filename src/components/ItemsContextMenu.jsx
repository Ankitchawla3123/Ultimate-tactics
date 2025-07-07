import { useState } from "react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ItemsContextMenu({ children, Update, Delete, Item }) {
  const ContextMenutype = Item.metadata.type;
  const [name, setname] = useState(Item?.name || "");
  const [number, setnumber] = useState(Item?.number || "");
  const [color, setcolor] = useState(Item?.color || "");

  const handleNameChange = (e) => {
    const value = e.target.value;
    setname(value);
    Update({ name: value });
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;
    const numberValue = parseInt(value, 10);

    if (value === "") {
      setnumber("");
    } else if (!isNaN(numberValue) && numberValue >= 0 && numberValue <= 99) {
      const strVal = numberValue.toString();
      setnumber(strVal);
      Update({ number: strVal });
    }
  };

  const handleColorChange = (e) => {
    const value = e.target.value;
    setcolor(value);
  };

  const handleDelete = () => {
    Delete();
  };

  const handleOpenChange = (open) => {
    if (open) {
      setname(Item?.name || "");
      setnumber(Item?.number || "");
      setcolor(Item?.color || "");
    }
  };

  return (
    <ContextMenu onOpenChange={handleOpenChange}>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-44 sm:w-60 md:w-64 lg:w-68 text-xs sm:text-sm md:text-base">
        {ContextMenutype === "player" && (
          <>
            <ContextMenuItem
              onSelect={(e) => e.preventDefault()}
              className="lg:h-12"
            >
              <Input
                type="text"
                value={name}
                onChange={handleNameChange}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                placeholder="Player name"
                className="w-full bg-transparent outline-none text-xs sm:text-sm md:text-base px-2 py-1"
              />
            </ContextMenuItem>

            <ContextMenuItem onSelect={(e) => e.preventDefault()}>
              <Input
                type="number"
                value={number}
                onChange={handleNumberChange}
                placeholder="Player number"
                className="w-full bg-transparent outline-none text-xs sm:text-sm md:text-base px-2 py-1"
                onKeyDown={(e) => e.stopPropagation()}
              />
            </ContextMenuItem>

            <ContextMenuItem
              onSelect={(e) => e.preventDefault()}
              className="flex items-center gap-2 px-2"
            >
              <Input
                type="color"
                value={color}
                onChange={handleColorChange}
                className="w-16 lg:w-20 p-0"
              />
              <Button
                onClick={() => Update({ color: color })}
                variant="default"
                className="text-xs sm:text-sm md:text-base px-2"
              >
                Apply Color
              </Button>
            </ContextMenuItem>

            <ContextMenuSeparator />

            <ContextMenuItem>
              <Button
                onClick={handleDelete}
                variant="destructive"
                className="text-xs sm:text-sm md:text-base px-2"
              >
                Remove Player
              </Button>
            </ContextMenuItem>
          </>
        )}
        {ContextMenutype === "shape" && (
          <>
            <ContextMenuItem
              onSelect={(e) => e.preventDefault()}
              className="flex items-center gap-2 px-2"
            >
              <Input
                type="color"
                value={color}
                onChange={handleColorChange}
                className="w-16 lg:w-20 p-0"
              />
              <Button
                onClick={() => Update({ color: color })}
                variant="default"
                className="text-xs sm:text-sm md:text-base px-2"
              >
                Apply Color
              </Button>
            </ContextMenuItem>

            <ContextMenuSeparator />

            <ContextMenuItem>
              <Button
                onClick={handleDelete}
                variant="destructive"
                className="text-xs sm:text-sm md:text-base px-2"
              >
                Remove Shape
              </Button>
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
