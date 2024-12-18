import React, { useRef, useState, useEffect, useCallback } from "react";

import { cn } from "@/utils/cn";
import { throttleFn } from "@/utils/throttleFn";

export type SectionItem = {
  id: string;
  label: string;
  icon?: string;
  content?: any;
};

const AnchorItem = ({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon?: string;
  label: string;
  isActive?: boolean;
  onClick?: any;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "nav-item flex flex-row text-foreground-800 justify-center p-2",
      { "text-primary": isActive }
    )}
  >
    <span className="icon" style={{ fontSize: "20px", marginBottom: "4px" }}>
      {icon}
    </span>
    <span className="label">{label}</span>
  </button>
);

export const ScrollAnchorSection = ({
  sections,
  containerRef,
  offset = 118,
}: {
  sections: SectionItem[];
  containerRef?: any;
  offset?: number;
}) => {
  const [activeSection, setActiveSection] = useState("");
  const [showNav, setShowNav] = useState(false);
  const sectionRefs = useRef<any>({});
  const self = useRef<any>();

  // init refs
  const setRef = useCallback((element: any, id: string) => {
    if (element) {
      sectionRefs.current[id] = element;
    }
  }, []);

  const handleScroll = useCallback(() => {
    const container =
      containerRef?.current || self.current.closest(".scrollContainer");

    setShowNav(container.scrollTop > 300);
    // find visiable section
    for (const section of sections) {
      const element = sectionRefs.current[section.id];

      if (!element) continue;

      const rect = element.getBoundingClientRect();
      if (rect.top <= offset && rect.bottom >= offset) {
        setActiveSection(section.id);
        break;
      }
    }
  }, [offset]);

  // scroll
  useEffect(() => {
    const throttledScroll = throttleFn(handleScroll, 100);
    const container =
      containerRef?.current || self.current.closest(".scrollContainer");
    if (container) {
      container.addEventListener("scroll", throttledScroll);
      return () => container.removeEventListener("scroll", throttledScroll);
    }
  }, [handleScroll]);

  // scroll to
  const scrollToSection = useCallback(
    (id: string) => {
      const container =
        containerRef?.current || self.current.closest(".scrollContainer");
      const element = sectionRefs.current[id];
      if (element) {
        const elementPosition = element.offsetTop;

        container.scrollTo({
          top: elementPosition - offset + 8,
          behavior: "smooth",
        });

        handleScroll();
      }
    },
    [offset]
  );

  return (
    <div ref={self}>
      {sections.map((item: SectionItem) => (
        <section key={item.id} ref={(el) => setRef(el, item.id)} id={item.id}>
          {item.content}
        </section>
      ))}

      <nav
        className={cn(
          "z-20 fixed flex top-14 left-0 right-0 bg-background-700 px-2 py-1 justify-around text-center items-center border-b border-divider shadow-lg",
          { hidden: !showNav }
        )}
      >
        {sections.map((section) => (
          <AnchorItem
            key={section.id}
            icon={section.icon}
            label={section.label}
            isActive={activeSection === section.id}
            onClick={() => scrollToSection(section.id)}
          />
        ))}
      </nav>
    </div>
  );
};
