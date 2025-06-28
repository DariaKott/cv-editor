import styles from "./Input.module.scss";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  name?: string;
  placeholder?: string;
};

export const Input = ({
  label,
  value,
  onChange,
  type = "text",
  name,
  placeholder,
}: Props) => {
  return (
    <label className={styles.label}>
      {label}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={styles.input}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};
