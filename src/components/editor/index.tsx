import {
  MDXEditor,
  type MDXEditorMethods,
  toolbarPlugin,
  BoldItalicUnderlineToggles,
  linkPlugin,
  ListsToggle,
  listsPlugin,
  CodeToggle,
  Separator,
  UndoRedo,
  MDXEditorProps,
  InsertThematicBreak,
  thematicBreakPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { FC } from "react";

type EditorProps = MDXEditorProps & {
  ref?: React.MutableRefObject<MDXEditorMethods | null>;
};

const Editor: FC<EditorProps> = ({ markdown, ref, ...props }) => {
  return (
    <MDXEditor
      ref={ref}
      markdown={markdown}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <Separator />
              <BoldItalicUnderlineToggles />
              <Separator />
              <ListsToggle />
              <Separator />
              <CodeToggle />
              <InsertThematicBreak />
            </>
          ),
        }),
        linkPlugin(),
        listsPlugin(),
        thematicBreakPlugin(),
      ]}
      {...props}
    />
  );
};

export default Editor;
