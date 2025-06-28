import { Heading } from "../typography/Heading";
import { Text } from "../typography/Text";

interface Props {
  data: {
    position: string;
    company: string;
    period: string;
    description: string;
  };
}

export const ExperiencePreview = ({ data }: Props) => (
  <div>
    <Heading level={3}>ОПЫТ РАБОТЫ</Heading>
    <Text>
      <strong>{data.company}</strong>:<br />
      {data.period} {data.position};
    </Text>
    {data.description && <Text>{data.description}</Text>}
  </div>
);
