import { Heading } from "../typography/Heading";
import { BulletList } from "../typography/BulletList";

interface Props {
  data: {
    skills: string[];
  };
}

export const SkillsPreview = ({ data }: Props) => (
  <div>
    <Heading level={3}>НАВЫКИ</Heading>
    <BulletList items={data.skills} />
  </div>
);
