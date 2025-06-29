import { useRef } from "react";
import html2pdf from "html2pdf.js";

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
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (!resumeRef.current) return;

    html2pdf()
      .from(resumeRef.current)
      .set({
        margin: 0.5,
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .save();
  };

  return (
    <div className={styles.wrapper}>
      <div ref={resumeRef} className={styles.preview}>
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
      </div>

      <Button onClick={handleDownloadPDF}>Скачать как PDF</Button>
    </div>
  );
};
