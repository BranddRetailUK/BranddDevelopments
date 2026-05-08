"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ScrollAccentProps = {
  className: string;
  rotateFrom?: number;
  rotateTo?: number;
  xFrom?: string;
  xTo?: string;
  yFrom?: string;
  yTo?: string;
};

export function ScrollAccent({
  className,
  rotateFrom = -6,
  rotateTo = 6,
  xFrom = "-4%",
  xTo = "4%",
  yFrom = "0%",
  yTo = "0%",
}: ScrollAccentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 88%", "end 12%"],
  });

  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [rotateFrom, 0, rotateTo]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [xFrom, "0%", xTo]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [yFrom, "0%", yTo]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={prefersReducedMotion ? undefined : { rotate, x, y }}
      aria-hidden="true"
    />
  );
}
