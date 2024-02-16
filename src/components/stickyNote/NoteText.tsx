import { FC } from "react";
import Markdown from "react-markdown";

type NoteTextProps = {
  text: string;
  onClick: () => void;
};

const NoteText: FC<NoteTextProps> = ({ text, onClick }) => {
  return (
    <div className="text-center m-4 mb-0 line-clamp-5" onClick={onClick}>
      <Markdown>{text}</Markdown>
    </div>
  );
};

export default NoteText;
