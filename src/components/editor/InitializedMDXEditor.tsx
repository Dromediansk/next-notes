"use client";

import type { FC, ForwardedRef } from "react";
import {
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  toolbarPlugin,
  BoldItalicUnderlineToggles,
  linkPlugin,
  ListsToggle,
  listsPlugin,
  CodeToggle,
  Separator,
} from "@mdxeditor/editor";

type InitializedMDXEditorProps = MDXEditorProps & {
  editorRef: ForwardedRef<MDXEditorMethods> | null;
};

const InitializedMDXEditor: FC<InitializedMDXEditorProps> = ({
  editorRef,
  ...props
}) => {
  return (
    <MDXEditor
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <BoldItalicUnderlineToggles />
              <Separator />
              <ListsToggle />
              <Separator />
              <CodeToggle />
            </>
          ),
        }),
        linkPlugin(),
        listsPlugin(),
      ]}
      {...props}
      ref={editorRef}
    />
  );
};

export default InitializedMDXEditor;
