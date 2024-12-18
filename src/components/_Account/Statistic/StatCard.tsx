import React from 'react';

interface StatCardProps {
  label: string;
  value: any;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="flex flex-row w-full justify-between items-center p-2 border-b border-divider last:border-0">
      <h3 className="text-sm leading-6 text-foreground-600">{label}</h3>
      <p className="mt-1 text-md font-bold leading-loose text-foreground">{value}</p>
    </div>
  );
};

export default StatCard;