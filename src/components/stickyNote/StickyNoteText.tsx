import { FC } from "react";
import Markdown from "react-markdown";

type StickyNoteTextProps = {
  text: string;
  onClick: () => void;
};

const StickyNoteText: FC<StickyNoteTextProps> = ({ text, onClick }) => {
  return (
    <div className="text-center m-4 mb-0 line-clamp-5" onClick={onClick}>
      <Markdown>{text}</Markdown>
    </div>
  );
};

export default StickyNoteText;
