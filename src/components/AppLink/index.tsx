import { Link } from "@nextui-org/react";
import type { ReactNode } from "react";

import { useRouter } from "@/libs/i18nNavigation";
import { cn } from "@/utils/cn";

function AppLink({
  href,
  className,
  target,
  title,
  onClick,
  children,
}: {
  href?: string;
  className?: string;
  target?: string;
  title?: string;
  onClick?: any;
  children: ReactNode;
}) {
  const hrefPath = href?.startsWith("http");
  const _target = target ? target : hrefPath ? "_blank" : "_self";

  // use router.push instead of Link router
  const router = useRouter();
  return (
    <Link
      className={cn("text-foreground cursor-pointer", className)}
      href={hrefPath ? href : undefined}
      title={title}
      target={_target}
      rel={hrefPath ? "noopener noreferrer" : ""}
      aria-hidden="true"
      onClick={
        onClick
          ? onClick
          : () => {
            if (href && _target != "_blank") {
              router.push(href);
            }
          }
      }
    >
      {children}
    </Link>
  );
}

export default AppLink;
