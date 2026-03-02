import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "motion/react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
  dimmed = false,
  /** Delay (seconds) before gradient dims when showing card back */
  delayWhenDimmed = 0,
  /** Delay (seconds) before gradient brightens when showing card front */
  delayWhenNotDimmed = 0,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
  /** When true, gradient is dimmed (e.g. when card back is visible) so content shows through */
  dimmed?: boolean;
  delayWhenDimmed?: number;
  delayWhenNotDimmed?: number;
}) => {
  const transitionDelay = dimmed ? delayWhenDimmed : delayWhenNotDimmed;
  const transitionStyle: React.CSSProperties = {
    transitionDelay: `${transitionDelay}s`,
  };
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
          ...transitionStyle,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] blur-xl transition-opacity duration-500 will-change-transform",
          dimmed ? "opacity-15 pointer-events-none" : "opacity-60 group-hover:opacity-100",
          " bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
          ...transitionStyle,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] will-change-transform transition-opacity duration-500",
          dimmed ? "opacity-20 pointer-events-none" : "opacity-100",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />

      <div className={cn("relative z-10 isolate", className)}>{children}</div>
    </div>
  );
};
