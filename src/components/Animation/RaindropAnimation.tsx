import { motion } from "framer-motion";
import React from "react";

const RaindropAnimation = ({
  isAnimating,
  setIsAnimating,
}: {
  isAnimating: boolean;
  setIsAnimating: any;
}) => {
  return (
    <>
      {isAnimating && (
        <>
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute z-20 top-0 h-4 w-1 bg-blue-400 opacity-70
                animate-[fall_5s_ease-out_forwards]
              `}
              style={{
                left: `${Math.random() * 100}%`,
                top: "-10px",
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            ></div>
          ))}
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: [0, 1.2, 1],
              rotate: [0, 180, 0],
            }}
            transition={{ duration: 5 }}
            onAnimationComplete={() => {
              setIsAnimating(false);
            }}
            className="absolute hidden"
          >
            😰
          </motion.div>
        </>
      )}
    </>
  );
};

export default RaindropAnimation;
