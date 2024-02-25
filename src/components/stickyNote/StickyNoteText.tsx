import { FC } from "react";
import Markdown from "react-markdown";

type StickyNoteTextProps = {
  text: string;
  onClick: () => void;
};

const StickyNoteText: FC<StickyNoteTextProps> = ({ text, onClick }) => {
  return (
    <div
      className="text-center p-2 max-h-32 cursor-pointer overflow-auto"
      onClick={onClick}
    >
      <Markdown>{text}</Markdown>
    </div>
  );
};

export default StickyNoteText;
