'use client';

import * as React from 'react';
import { motion, type Variants } from 'motion/react';

import {
  getVariants,
  useAnimateIconContext,
  IconWrapper,
  type IconProps,
} from '@/components/animate-ui/icons/icon';

type TerminalProps = IconProps<keyof typeof animations>;

const animations = {
  default: {
    path1: {
      initial: {
        opacity: 1,
      },
      animate: {
        opacity: [1, 0, 1, 0, 1],
        transition: {
          duration: 1.5,
          ease: 'easeInOut',
        },
      },
    },
    path2: {},
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size, ...props }: TerminalProps) {
  const { controls } = useAnimateIconContext();
  const variants = getVariants(animations);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <motion.path
        d="M12 19h8"
        variants={variants.path1}
        initial="initial"
        animate={controls}
      />
      <motion.path
        d="m4 17 6-6-6-6"
        variants={variants.path2}
        initial="initial"
        animate={controls}
      />
    </motion.svg>
  );
}

function Terminal(props: TerminalProps) {
  return <IconWrapper icon={IconComponent} {...props} />;
}

export {
  animations,
  Terminal,
  Terminal as TerminalIcon,
  type TerminalProps,
  type TerminalProps as TerminalIconProps,
};
