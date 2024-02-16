const EditorSkeleton = () => {
  return (
    <div role="status" className="p-2 w-full h-full animate-pulse">
      <div className="h-12 bg-gray-200 rounded dark:bg-gray-700 w-full mb-4"></div>
      <div className="h-full bg-gray-200 rounded dark:bg-gray-700 w-full mb-2.5"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default EditorSkeleton;
