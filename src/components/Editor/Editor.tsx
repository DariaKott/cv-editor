import styles from "./Editor.module.scss";
import type {
  ResumeSection,
  SectionType,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  AboutSection,
} from "../../types/resume";
import { v4 as uuidv4 } from "uuid";
import { ExperienceForm } from "../SectionForm/ExperienceForm";
import { EducationForm } from "../SectionForm/EducationForm";
import { AboutForm } from "../SectionForm/AboutForm";
import { ProfileForm, type ProfileData } from "../ProfileForm/ProfileForm";
import { SkillsForm } from "../SectionForm/SkillsFrom";
import { Button } from "@/shared/ui/Button/Button";

const sectionTypes: { label: string; value: SectionType }[] = [
  { label: "Опыт", value: "experience" },
  { label: "Образование", value: "education" },
  { label: "Навыки", value: "skills" },
  { label: "О себе", value: "about" },
];

type EditorProps = {
  profile: ProfileData;
  setProfile: (data: ProfileData) => void;
  sections: ResumeSection[];
  setSections: (data: ResumeSection[]) => void;
  defaultProfile: ProfileData;
  defaultSections: ResumeSection[];
};

export const Editor = ({
  profile,
  setProfile,
  sections,
  setSections,
  defaultProfile,
  defaultSections,
}: EditorProps) => {
  const handleAddSection = (type: SectionType) => {
    let newSection: ResumeSection;

    switch (type) {
      case "experience":
        newSection = {
          id: uuidv4(),
          type: "experience",
          data: { position: "", company: "", period: "", description: "" },
        } satisfies ExperienceSection;
        break;
      case "education":
        newSection = {
          id: uuidv4(),
          type: "education",
          data: { institution: "", degree: "", period: "" },
        } satisfies EducationSection;
        break;
      case "skills":
        newSection = {
          id: uuidv4(),
          type: "skills",
          data: { skills: [] },
        } satisfies SkillsSection;
        break;
      case "about":
        newSection = {
          id: uuidv4(),
          type: "about",
          data: { text: "" },
        } satisfies AboutSection;
        break;
    }

    setSections([...sections, newSection!]);
  };

  const handleClear = () => {
    localStorage.removeItem("cv-profile");
    localStorage.removeItem("cv-sections");
    setProfile(defaultProfile);
    setSections(defaultSections);
  };

  const updateSection = (id: string, type: SectionType, newData: any) => {
    setSections(
      sections.map((s) =>
        s.id === id && s.type === type ? { ...s, data: newData } : s
      )
    );
  };

  const deleteSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id));
  };

  return (
    <div className={styles.editor}>
      <h2>Редактор резюме</h2>

      <ProfileForm data={profile} onChange={setProfile} />

      <div className={styles.dropdown}>
        <label>Добавить секцию:</label>
        <select
          onChange={(e) => {
            const value = e.target.value as SectionType;
            if (value) handleAddSection(value);
            e.target.value = "";
          }}
        >
          <option value="">-- выбрать --</option>
          {sectionTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.sectionList}>
        {sections.map((section) => (
          <div key={section.id} className={styles.sectionItem}>
            {section.type === "experience" && (
              <ExperienceForm
                data={section.data}
                onChange={(data) =>
                  updateSection(section.id, "experience", data)
                }
                onDelete={() => deleteSection(section.id)}
              />
            )}
            {section.type === "education" && (
              <EducationForm
                data={section.data}
                onChange={(data) =>
                  updateSection(section.id, "education", data)
                }
                onDelete={() => deleteSection(section.id)}
              />
            )}
            {section.type === "about" && (
              <AboutForm
                data={section.data}
                onChange={(data) => updateSection(section.id, "about", data)}
                onDelete={() => deleteSection(section.id)}
              />
            )}
            {section.type === "skills" && (
              <SkillsForm
                data={section.data}
                onChange={(data) => updateSection(section.id, "skills", data)}
                onDelete={() => deleteSection(section.id)}
              />
            )}
          </div>
        ))}
      </div>

      <Button variant="primary" onClick={handleClear}>
        Очистить форму
      </Button>
    </div>
  );
};
