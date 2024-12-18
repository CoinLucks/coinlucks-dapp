import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// export const twMerge = extendTailwindMerge({
//     extend: {
//       "conflictingClassGroups":{
//         pr: ["pr", "pl"],
//         "border-w": ["border-samll"]
//       }
//     },
//   })

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}