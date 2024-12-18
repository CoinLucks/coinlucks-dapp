import React from 'react';

interface GameStatsProps {
  stats: {
    rtp: string;
    maxWin: string;
    mobile: string;
    provider: string;
    type: string;
    stakesRange: string;
  };
}

const GameStats: React.FC<GameStatsProps> = ({ stats }) => {
  const statItems = [
    { label: "RTP (Return to Player)", value: stats.rtp, valueClass: "text-green-500" },
    { label: "Max Win", value: stats.maxWin, valueClass: "text-green-500" },
    { label: "Mobile", value: stats.mobile },
    { label: "Provider", value: stats.provider },
    { label: "Type", value: stats.type },
    { label: "Stakes Range", value: stats.stakesRange, valueClass: "text-foreground-500" }
  ];

  return (
    <div className="flex overflow-hidden flex-wrap gap-0.5 items-start mt-4 w-full rounded-lg max-md:max-w-full">
      {[0, 1].map((columnIndex) => (
        <div key={columnIndex} className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
          {statItems.slice(columnIndex * 3, (columnIndex + 1) * 3).map((item, index) => (
            <div key={index} className="flex gap-10 justify-between items-start px-4 py-2 w-full bg-background-800">
              <div className={item.valueClass || "text-foreground"}>{item.label}</div>
              <div className={item.valueClass || "text-foreground"}>{item.value}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameStats;