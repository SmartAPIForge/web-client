import { useAuth } from "@/react/shared/hooks/useAuth.ts";
import styles from "./ProfileDataWidget.module.scss";

export const ProfileDataWidget = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className={styles.dataBox}>
      <div className={styles.imageBox}>
        <img
          src="https://placehold.co/400x400"
          className={styles.image}
          alt="avatar"
        />
      </div>
      <div className={styles.rawData}>
        <h3>About</h3>
        <div className={styles.rawDataBox}>
          <div>
            <h4 className={styles.rawLabel}>Username</h4>
            <p className={styles.rawValue}>{user.username}</p>
          </div>
          <div>
            <h4 className={styles.rawLabel}>Email</h4>
            <p className={styles.rawValue}>{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
