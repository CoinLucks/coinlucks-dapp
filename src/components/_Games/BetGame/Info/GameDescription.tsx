import React from 'react';

interface GameDescriptionProps {
  description: string[];
}

const GameDescription: React.FC<GameDescriptionProps> = ({ description }) => {
  return (
    <article className="flex flex-col flex-1 shrink text-foreground-800 basis-0 min-w-[240px] max-md:max-w-full">
      <h2 className="self-start text-base font-bold text-center text-foreground">
        Features Tags
      </h2>
      {description.map((paragraph, index) => (
        <p key={index} className="mt-1 leading-6 max-md:max-w-full">
          {paragraph}
        </p>
      ))}
    </article>
  );
};

export default GameDescription;