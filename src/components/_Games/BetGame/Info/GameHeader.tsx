import { Image } from '@nextui-org/react';
import React from 'react';

interface GameHeaderProps {
  gameName: string;
  creator: string;
  releaseDate: string;
  imageUrl: string;
}

const GameHeader: React.FC<GameHeaderProps> = ({ gameName, creator, releaseDate, imageUrl }) => {
  return (
    <header className="flex flex-col flex-1 shrink leading-6 text-center basis-0 min-w-[240px] max-md:max-w-full">
      <div className="flex gap-5 items-start self-start">
        <Image loading="lazy" src={imageUrl} alt={`${gameName} game icon`} className="object-contain shrink-0 aspect-square w-[88px]" />
        <div className="flex flex-col">
          <h1 className="self-start text-lg font-bold leading-loose text-foreground">
            {gameName}
          </h1>
          <div className="flex gap-1 items-start mt-1">
            <span className="text-foreground-800">By:</span>
            <span className="text-foreground">{creator}</span>
          </div>
          <div className="flex gap-1 items-start mt-1 text-foreground-800 whitespace-nowrap">
            <span>Release:</span>
            <time dateTime={releaseDate}>{releaseDate}</time>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;