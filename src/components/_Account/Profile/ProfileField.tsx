import React from "react";

interface ProfileFieldProps {
  label: string;
  value?: string;
  icon?: string;
  endContent?: any;
}

const ProfileField: React.FC<ProfileFieldProps> = ({
  label,
  value,
  endContent,
}) => {
  return (
    <div className="flex flex-col mb-3">
      <div className="flex flex-col w-full">
        <label className="flex-1 shrink gap-2 px-2 w-full text-xs leading-none text-foreground-600">
          {label}
        </label>
        <div className="flex gap-2 items-start p-3 mt-1 w-full text-sm font-semibold text-foreground rounded-xl border border-divider border-solid">
          <div className="flex-1 shrink basis-0 text-foreground-800">{value}</div>
          {endContent}
        </div>
      </div>
    </div>
  );
};

export default ProfileField;
