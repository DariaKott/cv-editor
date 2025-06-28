import styles from "./Editor.module.scss";
import type { ResumeSection, SectionType } from "../../types/resume";
import { v4 as uuidv4 } from "uuid";
import { ExperienceForm } from "../SectionForm/ExperienceForm";
import { EducationForm } from "../SectionForm/EducationForm";
import { AboutForm } from "../SectionForm/AboutForm";
import { ProfileForm, type ProfileData } from "../ProfileForm/ProfileForm";
import { SkillsForm } from "../SectionForm/SkillsFrom";
import { Button } from "@/shared/ui/Button/Button";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

const SortableItem = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // 👇 Этот обработчик блокирует drag на интерактивных элементах
  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    const tag = target.tagName;

    // Игнорировать drag, если клик был по input, textarea, select или button
    if (
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      tag === "SELECT" ||
      tag === "BUTTON" ||
      target.closest("button") ||
      target.closest("input") ||
      target.closest("select") ||
      target.closest("textarea")
    ) {
      return;
    }

    if (listeners && typeof listeners.onPointerDown === "function") {
      listeners.onPointerDown(e);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      onPointerDown={handlePointerDown}
    >
      {children}
    </div>
  );
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
    const id = uuidv4();
    let newSection: ResumeSection;

    switch (type) {
      case "experience":
        newSection = {
          id,
          type,
          data: {
            position: "",
            company: "",
            period: "",
            description: "",
          },
        };
        break;
      case "education":
        newSection = {
          id,
          type,
          data: {
            institution: "",
            degree: "",
            period: "",
          },
        };
        break;
      case "skills":
        newSection = {
          id,
          type,
          data: {
            skills: [],
          },
        };
        break;
      case "about":
        newSection = {
          id,
          type,
          data: {
            text: "",
          },
        };
        break;
    }

    setSections([...sections, newSection]);
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

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over?.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        const updated = arrayMove(sections, oldIndex, newIndex);
        setSections(updated);
      }
    }
  };

  return (
    <div className={styles.editor}>
      <h2>Редактор резюме</h2>

      <ProfileForm data={profile} onChange={setProfile} />

      <div className={styles.form_edits}>
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
        <Button variant="primary" onClick={handleClear}>
          Очистить форму
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className={styles.sectionList}>
            {sections.map((section) => (
              <SortableItem key={section.id} id={section.id}>
                <div className={styles.sectionItem}>
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
                      onChange={(data) =>
                        updateSection(section.id, "about", data)
                      }
                      onDelete={() => deleteSection(section.id)}
                    />
                  )}
                  {section.type === "skills" && (
                    <SkillsForm
                      data={section.data}
                      onChange={(data) =>
                        updateSection(section.id, "skills", data)
                      }
                      onDelete={() => deleteSection(section.id)}
                    />
                  )}
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
