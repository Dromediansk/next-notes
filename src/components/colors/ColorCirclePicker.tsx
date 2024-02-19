import { getContrastColor } from "@/utils/colors";
import { FC } from "react";

type ColorCirclePickerProps = {
  backgroundColor: string;
  onClick: (color: string) => void;
  isSelected: boolean;
};

const ColorCirclePicker: FC<ColorCirclePickerProps> = ({
  backgroundColor,
  onClick,
  isSelected,
}) => {
  const borderColor = getContrastColor(backgroundColor);

  return (
    <span
      className="w-5 h-5 mx-2 rounded-full"
      style={{
        backgroundColor,
        border: isSelected ? `2px solid ${borderColor}` : "none",
      }}
      onClick={() => onClick(backgroundColor)}
    />
  );
};

export default ColorCirclePicker;
