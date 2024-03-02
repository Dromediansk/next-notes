const ProgressBar = () => {
  return (
    <div className="w-full">
      <div className="h-1.5 w-full bg-main-light overflow-hidden">
        <div className="animate-progress w-full h-full bg-main origin-left-right"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
