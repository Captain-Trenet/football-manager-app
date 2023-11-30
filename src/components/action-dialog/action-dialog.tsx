import { useDispatch } from "react-redux";
import styles from "./action-dialog.module.scss";
import { setDialogWindow } from "@/redux/reducers/dialogSlice";
import Close from "@/assets/close";
import Pen from "@/assets/pen";
import Trash from "@/assets/trash";

const ActionDialog = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.heading}>Actions</div>
        <div
          onClick={() => dispatch(setDialogWindow({ type: "cancel" }))}
          className={styles.closeDialog}
        >
          <Close type={2} />
        </div>
      </div>

      <div className={styles.actions}>
        <div
          onClick={() => dispatch(setDialogWindow({ type: "edit" }))}
          className={styles.action}
        >
          <Pen />
          <div>Edit Player</div>
        </div>
        <div
          onClick={() => dispatch(setDialogWindow({ type: "confirm" }))}
          className={styles.action}
        >
          <Trash />
          <div>Delete Player</div>
        </div>
      </div>
    </div>
  );
};

export default ActionDialog;
