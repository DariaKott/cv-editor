export type SectionType = 'experience' | 'education' | 'skills' | 'about'

export interface BaseSection {
  id: string
  type: SectionType
}

export interface ExperienceSection extends BaseSection {
  type: 'experience'
  data: {
    position: string
    company: string
    period: string
    description: string
  }
}

export interface EducationSection extends BaseSection {
  type: 'education'
  data: {
    institution: string
    degree: string
    period: string
  }
}

export interface SkillsSection extends BaseSection {
  type: 'skills'
  data: {
    skills: string[]
  }
}

export interface AboutSection extends BaseSection {
  type: 'about'
  data: {
    text: string
  }
}

export type ResumeSection =
  | ExperienceSection
  | EducationSection
  | SkillsSection
  | AboutSection
