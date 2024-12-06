"use client";

import {
  MDXEditor,
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
  MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { FC, MutableRefObject } from "react";

type EditorProps = MDXEditorProps & {
  editorRef?: MutableRefObject<MDXEditorMethods | null>;
};

const Editor: FC<EditorProps> = ({ markdown, editorRef, ...props }) => {
  return (
    <MDXEditor
      markdown={markdown}
      ref={editorRef}
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
