import { motion } from "framer-motion";
import React from "react";

const ConfettiAnimation = ({
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
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute z-10 w-3 h-3 rounded-full text-2xl
                animate-[confetti_5s_ease-out_forwards]
              `}
              style={{
                left: `${Math.random() * 100}%`,
                top: "-10px",
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            >
              🏆
            </div>
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
            🏆
          </motion.div>
        </>
      )}
    </>
  );
};

export default ConfettiAnimation;
