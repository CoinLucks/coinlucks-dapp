import React from "react";

import GameDescription from "./GameDescription";
import GameHeader from "./GameHeader";
import GameStats from "./GameStats";

interface GameInfoProps {
  chainId: number,
  gameName: string;
  creator: string;
  releaseDate: string;
  imageUrl: string;
  stats: {
    rtp: string;
    maxWin: string;
    mobile: string;
    provider: string;
    type: string;
    stakesRange: string;
  };
  description: string[];
}

const GameInfo: React.FC<GameInfoProps> = ({
  chainId,
  gameName,
  creator,
  releaseDate,
  imageUrl,
  stats,
  description
}) => {
  return (
    <div className="flex flex-row max-md:flex-col mt-4 gap-6 items-start p-6 text-sm rounded-xl bg-background-700 max-md:px-5">
      <div className="flex flex-col w-[45%] max-md:w-full">
      <GameHeader
        gameName={gameName}
        creator={creator}
        releaseDate={releaseDate}
        imageUrl={imageUrl}
      />
      <GameStats stats={stats} />
      </div>
      <GameDescription description={description} />
    </div>
  );
};

export default GameInfo;