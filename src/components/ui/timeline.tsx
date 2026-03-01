"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  title?: string;
  description?: string;
  /** Pass a scrollable ancestor ref when the timeline lives inside a scroll container (e.g. a modal). */
  scrollContainerRef?: React.RefObject<HTMLElement>;
}

export const Timeline = ({
  data,
  title,
  description,
  scrollContainerRef,
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans md:px-10"
      ref={containerRef}
    >
      {(title || description) && (
        <div className="max-w-2xl mx-auto py-10 px-4 md:px-8 lg:px-10">
          {title && (
            <h2 className="text-lg md:text-2xl mb-2 text-fore-primary max-w-4xl font-oswald">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-fore-subtle text-sm md:text-base max-w-sm">
              {description}
            </p>
          )}
        </div>
      )}

      <div ref={ref} className="relative max-w-2xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-24 md:gap-8"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start md:w-60 shrink-0">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-back-primary dark:bg-back-secondary flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-back-subtle border border-back-subtle p-2" />
              </div>
              <h3 className="hidden md:block md:pl-20 text-lg font-bold text-fore-subtle whitespace-nowrap">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-base mb-4 text-left font-bold text-fore-subtle">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-back-subtle to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
