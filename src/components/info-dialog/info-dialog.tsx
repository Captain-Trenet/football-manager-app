import Triangle from "@/assets/triangle";
import styles from "./info-dialog.module.scss";
import { InfoDialogProps } from "@/interfaces/interfaces";

const InfoDialog: React.FC<InfoDialogProps> = ({ name, message }) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Triangle />
        <div>{name}</div>
      </div>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default InfoDialog;
