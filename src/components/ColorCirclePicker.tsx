import { FC } from "react";

type ColorCirclePickerProps = {
  color: string;
  backgroundColor: string;
  onClick: (color: string) => void;
  isSelected: boolean;
};

const ColorCirclePicker: FC<ColorCirclePickerProps> = ({
  color,
  backgroundColor,
  onClick,
  isSelected,
}) => {
  return (
    <span
      className={`w-5 h-5 rounded-full text-[${color}] ${
        isSelected ? "border-2 border-gray-500" : ""
      }`}
      style={{ backgroundColor }}
      onClick={() => onClick(backgroundColor)}
    />
  );
};

export default ColorCirclePicker;
