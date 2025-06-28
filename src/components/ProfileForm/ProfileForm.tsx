import { Input } from "@/shared/ui/Input/Input";
import styles from "./ProfileForm.module.scss";

export type ProfileData = {
  name: string;
  position: string;
  email: string;
  phone: string;
  location: string;
};

interface ProfileFormProps {
  data: ProfileData;
  onChange: (newData: ProfileData) => void;
}

export const ProfileForm = ({ data, onChange }: ProfileFormProps) => {
  const handleChange = (field: keyof ProfileData, value: string): void => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className={styles.profileForm}>
      <h3>Личная информация</h3>

      <Input
        label="Имя и фамилия"
        value={data.name}
        onChange={(val) => handleChange("name", val)}
      />

      <Input
        label="Позиция / Должность"
        value={data.position}
        onChange={(val) => handleChange("position", val)}
      />

      <Input
        label="Email"
        value={data.email}
        onChange={(val) => handleChange("email", val)}
      />

      <Input
        label="Телефон"
        value={data.phone}
        onChange={(val) => handleChange("phone", val)}
      />

      <Input
        label="Город / Страна"
        value={data.location}
        onChange={(val) => handleChange("location", val)}
      />
    </div>
  );
};
