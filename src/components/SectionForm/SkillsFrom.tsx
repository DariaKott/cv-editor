import { useState } from "react";
import { Input } from "@/shared/ui/Input/Input";
import { Form } from "@/shared/ui/Form/Form";
import { Button } from "@/shared/ui/Button/Button";
import styles from "./SkillsForm.module.scss";
import type { SkillsSection } from "@/types/resume";

type Props = {
  data: SkillsSection["data"];
  onChange: (newData: SkillsSection["data"]) => void;
  onDelete?: () => void;
};

export const SkillsForm = ({ data, onChange, onDelete }: Props) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      onChange({ skills: [...data.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    const updated = [...data.skills];
    updated.splice(index, 1);
    onChange({ skills: updated });
  };

  return (
    <Form onDelete={onDelete}>
      <h3>Навыки</h3>

      <div className={styles.addSkill}>
        <Input
          label="Добавить навык"
          value={newSkill}
          onChange={(val) => setNewSkill(val)}
        />
        <Button onClick={addSkill}>Добавить</Button>
      </div>

      <ul className={styles.skillList}>
        {data.skills.map((skill, index) => (
          <li key={index} className={styles.skillItem}>
            {skill}
            <button
              onClick={() => removeSkill(index)}
              className={styles.removeButton}
              aria-label={`Удалить навык ${skill}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </Form>
  );
};
