import { cn } from "@/utils/cn";

function ServerError({
  className,
  error,
}: {
  className?: string;
  error?: any;
}) {
  if (error) {
    console.error(error);
    return <div className={cn("p-2", className)}>Service not available</div>;
  }
  return <></>;
}

export default ServerError;
