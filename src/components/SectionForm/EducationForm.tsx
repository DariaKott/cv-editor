import type { EducationSection } from "@/types/resume";
import { Input } from "@/shared/ui/Input/Input";
import { Form } from "@/shared/ui/Form/Form";
// import styles from "./EducationForm.module.scss";

type Props = {
  data: EducationSection["data"];
  onChange: (newData: EducationSection["data"]) => void;
  onDelete?: () => void;
};

export const EducationForm = ({ data, onChange, onDelete }: Props) => {
  const handleChange = (field: keyof typeof data, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Form onDelete={onDelete}>
      <Input
        label="Учебное заведение"
        value={data.institution}
        onChange={(val) => handleChange("institution", val)}
      />

      <Input
        label="Специальность / Степень"
        value={data.degree}
        onChange={(val) => handleChange("degree", val)}
      />

      <Input
        label="Период обучения"
        value={data.period}
        onChange={(val) => handleChange("period", val)}
      />
    </Form>
  );
};
