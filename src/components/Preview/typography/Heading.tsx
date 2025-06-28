import * as React from "react";
import type { ReactNode } from "react";
import styles from "./Heading.module.scss";

interface HeadingProps {
  level?: 1 | 2 | 3;
  children: ReactNode;
}

export const Heading = ({ level = 1, children }: HeadingProps) => {
  const tag = `h${level}` as keyof React.JSX.IntrinsicElements;

  return React.createElement(tag, { className: styles[`h${level}`] }, children);
};
