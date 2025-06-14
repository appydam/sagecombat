
/**
 * Animation utilities for consistent animations across the application
 */

interface AnimationProps {
  delay?: number;
  duration?: number;
}

export const fadeIn = ({ delay = 0, duration = 0.5 }: AnimationProps = {}) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay, duration, ease: "easeOut" },
});

export const fadeUp = ({ delay = 0, duration = 0.5 }: AnimationProps = {}) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration, ease: "easeOut" },
});

export const fadeDown = ({ delay = 0, duration = 0.5 }: AnimationProps = {}) => ({
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration, ease: "easeOut" },
});

export const scale = ({ delay = 0, duration = 0.5 }: AnimationProps = {}) => ({
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { delay, duration, ease: "easeOut" },
});

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const getStaggerDelay = (index: number, base: number = 0.1) => {
  return { animationDelay: `${index * base}s` };
};

// Floating animation for background elements
export const floatingAnimation = {
  '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
  '50%': { transform: 'translateY(-20px) rotate(180deg)' },
};

// Gradient animation for text
export const gradientAnimation = {
  '0%': { backgroundPosition: '0% 50%' },
  '50%': { backgroundPosition: '100% 50%' },
  '100%': { backgroundPosition: '0% 50%' },
};
