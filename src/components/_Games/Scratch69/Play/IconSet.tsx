import { HowToPlayButton } from "./ScratchCard/HowToPlay";

const IconSet: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-end gap-4 items-center w-full rounded-xl max-md:max-w-full">
      <HowToPlayButton />
    </div>
  )
};

export default IconSet;
