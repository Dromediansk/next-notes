import Image from "next/image";

const NoStickyNotes = () => {
  return (
    <div className="flex flex-col items-center p-4">
      <Image
        src="/assets/no_data.svg"
        width={0}
        height={0}
        alt="no notes"
        priority
        sizes="100vw"
        className="w-56 h-auto"
      />
      <p className="text-gray-500 pt-10 text-center">
        Your notes seem to be on vacation. <br /> Time to break the silence with
        a new note!
      </p>
    </div>
  );
};

export default NoStickyNotes;
