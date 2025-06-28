import type { ExperienceSection } from "@/types/resume";
import { Input } from "@/shared/ui/Input/Input";
import { Textarea } from "@/shared/ui/Textarea/Textarea";
import { Form } from "@/shared/ui/Form/Form";
// import styles from "./ExperienceForm.module.scss";

type Props = {
  data: ExperienceSection["data"];
  onChange: (newData: ExperienceSection["data"]) => void;
  onDelete?: () => void;
};

export const ExperienceForm = ({ data, onChange, onDelete }: Props) => {
  const handleChange = (field: keyof typeof data, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Form onDelete={onDelete}>
      <Input
        label="Должность"
        value={data.position}
        onChange={(val) => handleChange("position", val)}
      />

      <Input
        label="Компания"
        value={data.company}
        onChange={(val) => handleChange("company", val)}
      />

      <Input
        label="Период"
        value={data.period}
        onChange={(val) => handleChange("period", val)}
      />

      <Textarea
        label="Описание"
        value={data.description}
        onChange={(val) => handleChange("description", val)}
      />
    </Form>
  );
};
