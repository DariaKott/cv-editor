import type { ReactNode } from "react";
import styles from "./Text.module.scss";

interface TextProps {
  children: ReactNode;
}

export const Text = ({ children }: TextProps) => {
  return <p className={styles.text}>{children}</p>;
};
