const ScratchNumbers = ({ numbers }: { numbers?: number[] }) => {
  return (
    <>
      {numbers?.map((value, index) => (
        <div key={index} className="flex flex-col w-[30%]">
          <div
            className={`flex shrink-0 items-center justify-center mx-auto rounded-full aspect-square bg-zinc-50 bg-opacity-20 h-[96px] w-[96px] max-md:w-[72px] max-md:h-[72px]`}
          >
            <span className="text-4xl font-bold text-white">{value}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default ScratchNumbers;
