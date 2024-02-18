import { BACKGROUND_COLORS } from "@/utils/colors";
import React, { FC } from "react";
import ColorCirclePicker from "./ColorCirclePicker";

type ColorCircleListProps = {
  onClick: (color: string) => void;
  selectedColor: string;
};

const ColorCircleList: FC<ColorCircleListProps> = ({
  onClick,
  selectedColor,
}) => {
  return (
    <div className="flex justify-around w-full p-2 rounded border-none bg-gray-200">
      {Array.from(Object.values(BACKGROUND_COLORS)).map((backgroundColor) => (
        <ColorCirclePicker
          key={backgroundColor}
          backgroundColor={backgroundColor}
          onClick={onClick}
          isSelected={backgroundColor === selectedColor}
        />
      ))}
    </div>
  );
};

export default ColorCircleList;
