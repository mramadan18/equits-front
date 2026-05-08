"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
  rotate?: number;
  amount?: number | "some" | "all";
  once?: boolean;
  className?: string;
  useInView?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  y = 30,
  x = 0,
  scale = 1,
  rotate = 0,
  amount = 0.2,
  once = true,
  className = "",
  useInView = true,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, scale, rotate }}
      {...(useInView
        ? {
            whileInView: { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 },
            viewport: { once, amount },
          }
        : {
            animate: { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 },
          })}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  delay?: number;
  staggerDelay?: number;
  className?: string;
  amount?: number | "some" | "all";
  once?: boolean;
}

export function StaggerContainer({
  children,
  delay = 0,
  staggerDelay = 0.15,
  className = "",
  amount = 0.1,
  once = true,
}: StaggerContainerProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  y = 30,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const itemVariants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
