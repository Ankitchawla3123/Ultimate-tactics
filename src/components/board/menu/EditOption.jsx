import {
  AlignLeftIcon,
  AlignRightIcon,
  BorderDashedIcon,
  DividerHorizontalIcon,
} from "@radix-ui/react-icons";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { DropMenu2 } from "../../index";

function EditOption({ handleLineType, isPortrait }) {
  return (
    <div className="flex">
      <DropMenu2
        isPortrait={isPortrait}
        placeholder={"line-features"}
        label={"Ends"}
        options={[
          {
            value: "left-arrow",
            placeholder: <ArrowLeftFromLine />,
          },
          {
            value: "left-end",
            placeholder: (
              <span className=" ">
                <AlignLeftIcon />
              </span>
            ),
          },
        ]}
        Default={"left-end"}
        onChange={handleLineType}
      />

      <DropMenu2
        placeholder={"line-features"}
        isPortrait={isPortrait}
        label={"line-type"}
        options={[
          {
            value: "plane",
            placeholder: <DividerHorizontalIcon />,
          },

          {
            value: "dashed",
            placeholder: (
              <span className=" flex h-auto ">
                <BorderDashedIcon className="" />
              </span>
            ),
          },
        ]}
        Default={"plane"}
        onChange={handleLineType}
      />

      <DropMenu2
        placeholder={"line-features"}
        isPortrait={isPortrait}
        label={"Ends"}
        options={[
          {
            value: "right-arrow",
            placeholder: <ArrowRightFromLine />,
          },
          {
            value: "right-end",
            placeholder: (
              <span className="  ">
                <AlignRightIcon />
              </span>
            ),
          },
        ]}
        Default={"right-end"}
        onChange={handleLineType}
      />
    </div>
  );
}

export default EditOption;
