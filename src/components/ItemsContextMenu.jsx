import { useState } from "react";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ItemsContextMenu({ children, Update, Delete, Item }) {
  const ContextMenutype = Item.type;

  const [name, setname] = useState(Item?.name || "");
  const [number, setnumber] = useState(Item?.number || "");
  const [color, setcolor] = useState(Item?.color || "");

  useEffect(() => {
    if (ContextMenu.type !== "player") {
      Update(name);
    }
  }, [name, setname]);

  useEffect(() => {
    if (ContextMenu.type !== "player") {
      Update(number);
    }
  }, [number, setnumber]);

  useEffect(() => {
    Update(color);
  }, [color, setcolor]);

  const handleDelete = () => {
    Delete();
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-44 sm:w-60 md:w-64 lg:w-68  text-xs sm:text-sm md:text-base">
        {ContextMenutype === "player" && (
          <>
            <ContextMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
              className="lg:h-12"
            >
              <Input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                placeholder="Player name"
                className="w-full bg-transparent outline-none text-xs sm:text-sm md:text-base px-2 py-1"
                onKeyDown={(e) => e.stopPropagation()}
              />
            </ContextMenuItem>

            <ContextMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
              // className="flex flex-col gap-1 px-2 py-2"
            >
              <Input
                type="number"
                value={number}
                onChange={(e) => setnumber(e.target.value)}
                placeholder="Player number"
                className="w-full bg-transparent outline-none text-xs sm:text-sm md:text-base px-2 py-1"
                onKeyDown={(e) => e.stopPropagation()}
              />
            </ContextMenuItem>

            <ContextMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
              className="flex items-center gap-2 px-2 "
            >
              <Input
                type="color"
                value={color}
                onChange={(e) => setcolor(e.target.value)}
                className=" w-16 lg:w-20 p-0 "
              />
              <Button
                variant="default"
                className="text-xs sm:text-sm md:text-base px-2 "
              >
                Apply Color
              </Button>
            </ContextMenuItem>

            <ContextMenuSeparator />

            <ContextMenuItem>
              <Button
                onClick={handleDelete}
                variant="destructive"
                className="text-xs sm:text-sm md:text-base px-2 "
              >
                Remove Player
              </Button>
            </ContextMenuItem>
          </>
        )}

        {ContextMenutype === "shape" && (
          <>
            <ContextMenuItem className="flex items-center gap-2 px-2 py-2">
              <input
                type="color"
                value={shapeColor}
                onChange={handleShapeColorChange}
                className="w-10 h-8"
              />
              <button
                onClick={applyShapeColor}
                className="text-xs sm:text-sm md:text-base"
              >
                Apply Color
              </button>
            </ContextMenuItem>

            <ContextMenuSeparator />

            <ContextMenuItem
              onClick={removeShape}
              className="text-xs sm:text-sm md:text-base px-2 py-2"
            >
              Remove Shape
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
