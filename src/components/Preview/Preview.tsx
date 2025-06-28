import type { ResumeSection } from "@/types/resume";
import type { ProfileData } from "../ProfileForm/ProfileForm";
import { Button } from "@/shared/ui/Button/Button";
import styles from "./Preview.module.scss";

import { ProfilePreview } from "./sections/ProfilePreview";
import { EducationPreview } from "./sections/EducationPreview";
import { ExperiencePreview } from "./sections/ExperiencePreview";
import { AboutPreview } from "./sections/AboutPreview";
import { SkillsPreview } from "./sections/SkillsPreview";

type Props = {
  profile: ProfileData;
  sections: ResumeSection[];
};

export const Preview = ({ profile, sections }: Props) => {
  return (
    <div className={styles.preview}>
      <ProfilePreview data={profile} />

      {sections.map((section) => {
        switch (section.type) {
          case "education":
            return <EducationPreview key={section.id} data={section.data} />;
          case "experience":
            return <ExperiencePreview key={section.id} data={section.data} />;
          case "about":
            return <AboutPreview key={section.id} data={section.data} />;
          case "skills":
            return <SkillsPreview key={section.id} data={section.data} />;
          default:
            return null;
        }
      })}

      <Button onClick={() => console.log("PDF отправлен")}>
        Отправить PDF
      </Button>
    </div>
  );
};
