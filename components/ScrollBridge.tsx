"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type BridgeVariant =
  | "sweep-right"
  | "sweep-left"
  | "long-drift"
  | "snap-cross"
  | "rise"
  | "reverse-rise";

type ScrollBridgeProps = {
  tone: "light" | "dark";
  label: string;
  variant?: BridgeVariant;
};

type BridgeOffset = NonNullable<NonNullable<Parameters<typeof useScroll>[0]>["offset"]>;

const bridgeVariants: Record<
  BridgeVariant,
  {
    offset: BridgeOffset;
    mainX: [string, string, string];
    accentX: [string, string, string];
    y: [string, string, string];
    rotate: [number, number, number];
    accentRotate: [number, number, number];
    width: [string, string, string];
  }
> = {
  "sweep-right": {
    offset: ["start 92%", "end 8%"],
    mainX: ["-8%", "0%", "8%"],
    accentX: ["-16%", "0%", "16%"],
    y: ["12%", "0%", "-12%"],
    rotate: [-4, 0, 4],
    accentRotate: [-3, 0, 3],
    width: ["46%", "70%", "88%"],
  },
  "sweep-left": {
    offset: ["start 90%", "end 10%"],
    mainX: ["8%", "0%", "-8%"],
    accentX: ["18%", "0%", "-14%"],
    y: ["-10%", "0%", "12%"],
    rotate: [4, 0, -4],
    accentRotate: [4, 0, -4],
    width: ["86%", "66%", "48%"],
  },
  "long-drift": {
    offset: ["start 100%", "end 0%"],
    mainX: ["-4%", "2%", "9%"],
    accentX: ["-22%", "-4%", "12%"],
    y: ["18%", "4%", "-8%"],
    rotate: [-6, -1, 3],
    accentRotate: [6, 2, -5],
    width: ["38%", "62%", "80%"],
  },
  "snap-cross": {
    offset: ["start 82%", "end 18%"],
    mainX: ["10%", "0%", "-12%"],
    accentX: ["-10%", "6%", "20%"],
    y: ["-18%", "0%", "16%"],
    rotate: [6, 0, -2],
    accentRotate: [-7, 0, 7],
    width: ["72%", "45%", "86%"],
  },
  rise: {
    offset: ["start 94%", "end 6%"],
    mainX: ["0%", "-7%", "5%"],
    accentX: ["12%", "-6%", "-18%"],
    y: ["22%", "0%", "-20%"],
    rotate: [2, -3, 5],
    accentRotate: [8, 0, -8],
    width: ["52%", "86%", "58%"],
  },
  "reverse-rise": {
    offset: ["start 96%", "end 4%"],
    mainX: ["-7%", "4%", "-3%"],
    accentX: ["18%", "2%", "-20%"],
    y: ["-18%", "0%", "18%"],
    rotate: [-3, 4, -5],
    accentRotate: [-8, 0, 9],
    width: ["82%", "56%", "74%"],
  },
};

export function ScrollBridge({ tone, label, variant = "sweep-right" }: ScrollBridgeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const config = bridgeVariants[variant];
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: config.offset,
  });

  const x = useTransform(scrollYProgress, [0, 0.5, 1], config.mainX);
  const accentX = useTransform(scrollYProgress, [0, 0.5, 1], config.accentX);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], config.y);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], config.rotate);
  const accentRotate = useTransform(scrollYProgress, [0, 0.5, 1], config.accentRotate);
  const width = useTransform(scrollYProgress, [0, 0.5, 1], config.width);

  return (
    <section
      ref={ref}
      className={`scroll-bridge bridge-${tone} bridge-${variant}`}
      aria-label={label}
    >
      <motion.div
        className="bridge-slab bridge-slab-main"
        style={prefersReducedMotion ? undefined : { x, rotate }}
        aria-hidden="true"
      />
      <motion.div
        className="bridge-slab bridge-slab-accent"
        style={prefersReducedMotion ? undefined : { x: accentX, y, rotate: accentRotate, width }}
        aria-hidden="true"
      />
      <div className="bridge-label">
        <span>{label}</span>
      </div>
    </section>
  );
}
