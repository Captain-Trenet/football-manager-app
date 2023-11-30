import { GroundProps } from "@/interfaces/interfaces";
import styles from "./ground.module.scss";

const Ground: React.FC<GroundProps> = ({ children }) => {
  return (
    <div className={styles.ground}>
      <div className={styles.fieldOutline}>
        <div className={styles.centerLine}></div>
        <div className={styles.centerCircle}></div>
        <div className={styles.leftGoal}></div>
        <div className={styles.leftGoal2}></div>
        <div className={styles.rightGoal}></div>
        <div className={styles.rightGoal2}></div>
        {children}
      </div>
    </div>
  );
};

export default Ground;
