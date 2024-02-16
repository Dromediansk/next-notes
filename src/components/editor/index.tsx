import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { forwardRef } from "react";
import "@mdxeditor/editor/style.css";
import EditorSkeleton from "./EditorSkeleton";

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import("./InitializedMDXEditor"), {
  // Make sure we turn SSR off
  ssr: false,
  loading: () => <EditorSkeleton />,
});

// This is what is imported by other components. Pre-initialized with plugins, and ready
// to accept other props, including a ref.
export const CustomEditor = forwardRef<MDXEditorMethods, MDXEditorProps>(
  (props, ref) => <Editor {...props} editorRef={ref} />
);

// TS complains without the following line
CustomEditor.displayName = "CustomEditor";
