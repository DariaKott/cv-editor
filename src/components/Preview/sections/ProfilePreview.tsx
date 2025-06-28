import type { ProfileData } from "@/components/ProfileForm/ProfileForm";
import { Heading } from "../typography/Heading";
import styles from "./ProfilePreview.module.scss";

interface Props {
  data: ProfileData;
}

export const ProfilePreview = ({ data }: Props) => {
  return (
    <div className={styles.profile}>
      <Heading level={1}>{data.name}</Heading>
      <div className={styles.position}>{data.position}</div>
      <div className={styles.contacts}>
        {data.email} • {data.phone} • {data.location}
      </div>
    </div>
  );
};
