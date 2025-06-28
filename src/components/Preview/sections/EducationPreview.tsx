import { Heading } from "../typography/Heading";
import { Text } from "../typography/Text";

interface Props {
  data: {
    institution: string;
    degree: string;
    period: string;
  };
}

export const EducationPreview = ({ data }: Props) => (
  <div>
    <Heading level={3}>ОБУЧЕНИЕ</Heading>
    <Text>
      <strong>{data.institution}</strong> — {data.degree} ({data.period})
    </Text>
  </div>
);
