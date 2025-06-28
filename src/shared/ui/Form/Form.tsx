import type { ReactNode } from "react";
import styles from "./Form.module.scss";

interface FormProps {
  children: ReactNode;
  onDelete?: () => void;
}

export const Form = ({ children, onDelete }: FormProps) => {
  return (
    <div className={styles.form}>
      {onDelete && (
        <button
          className={styles.deleteButton}
          onClick={onDelete}
          onPointerDown={(e) => e.stopPropagation()}
        >
          ✕
        </button>
      )}
      {children}
    </div>
  );
};
