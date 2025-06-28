import { Heading } from "../typography/Heading";
import { Text } from "../typography/Text";

interface Props {
  data: {
    text: string;
  };
}

export const AboutPreview = ({ data }: Props) => (
  <div>
    <Heading level={3}>О СЕБЕ</Heading>
    <Text>{data.text}</Text>
  </div>
);
