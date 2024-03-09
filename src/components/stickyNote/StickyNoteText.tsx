import { FC } from "react";
import Markdown from "react-markdown";

type StickyNoteTextProps = {
  text: string;
  onClick: () => void;
  isTemporary?: boolean;
};

const StickyNoteText: FC<StickyNoteTextProps> = ({
  text,
  onClick,
  isTemporary,
}) => {
  return (
    <div
      className={`text-center p-2 max-h-32 ${
        isTemporary ? "" : "cursor-pointer"
      } overflow-auto`}
      onClick={onClick}
    >
      <Markdown>{text}</Markdown>
    </div>
  );
};

export default StickyNoteText;
