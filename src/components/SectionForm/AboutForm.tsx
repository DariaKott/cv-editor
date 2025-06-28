import type { AboutSection } from "@/types/resume";
import { Textarea } from "@/shared/ui/Textarea/Textarea";
import { Form } from "@/shared/ui/Form/Form";

type Props = {
  data: AboutSection["data"];
  onChange: (newData: AboutSection["data"]) => void;
  onDelete?: () => void;
};

export const AboutForm = ({ data, onChange, onDelete }: Props) => {
  return (
    <Form onDelete={onDelete}>
      <Textarea
        label="О себе"
        value={data.text}
        onChange={(val) => onChange({ text: val })}
      />
    </Form>
  );
};
