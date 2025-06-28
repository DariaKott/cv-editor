import styles from "./Textarea.module.scss";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  name?: string;
  placeholder?: string;
};

export const Textarea = ({
  label,
  value,
  onChange,
  name,
  placeholder,
}: Props) => {
  return (
    <label className={styles.label}>
      {label}
      <textarea
        name={name}
        placeholder={placeholder}
        className={styles.textarea}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};
