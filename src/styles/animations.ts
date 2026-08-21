import { Transition } from "framer-motion";

export const easeInOutTransition: Transition = {
  duration: 0.32,
  ease: "easeInOut",
};

export const quickEaseInOut: Transition = {
  duration: 0.2,
  ease: "easeInOut",
};

export const bubbleUpCard = {
  initial: { opacity: 0, y: 24, scale: 0.94 },
  animate: { opacity: 1, y: 0, scale: 1 },
  whileHover: { y: -4, scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: (index: number = 0): Transition => ({
    duration: 0.32,
    ease: "easeInOut",
    delay: index * 0.05,
  }),
};

export const buttonInteractions = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.15, ease: "easeInOut" },
};

export const fadeInSlideUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25, ease: "easeOut" },
};
