"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ElementType, ReactNode } from "react";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  as?: ElementType;
} & Omit<HTMLMotionProps<"div">, "children">;

export function MotionReveal({
  children,
  className,
  delay = 0,
  once = true,
  as = "div",
  ...props
}: MotionRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion.create(as);

  return (
    <Component
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28, filter: "blur(10px)" }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount: 0.22 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    >
      {children}
    </Component>
  );
}
