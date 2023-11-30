import { useDispatch } from "react-redux";
import styles from "./confirm-dialog.module.scss";
import { useSelector } from "react-redux";
import { setDialogWindow } from "@/redux/reducers/dialogSlice";
import { deletePlayer } from "@/redux/reducers/playersSlice";
import Close from "@/assets/close";
import CustomButton from "../custom-button/custom-button";
import { RootState } from "@/redux/store";
const ConfirmDialog = () => {
  const dispatch = useDispatch();
  const currentPlayer = useSelector(
    (state: RootState) => state.players.currentPlayer
  );

  const closeDialog = () => {
    dispatch(setDialogWindow({ type: "cancel" }));
  };
  const deleteSelectedPlayer = () => {
    if (!currentPlayer) {
      return;
    }
    console.log(currentPlayer);
    dispatch(deletePlayer(currentPlayer.id));
    closeDialog();
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.heading}>Are you sure?</div>
        <div
          onClick={() => dispatch(setDialogWindow({ type: "cancel" }))}
          className={styles.closeDialog}
        >
          <Close type={2} />
        </div>
      </div>

      <div className={styles.text}>This action cannot be undone.</div>
      <div className={styles.buttons}>
        <CustomButton
          handleClick={closeDialog}
          name={"Cancel"}
          backgroundColor={"transparent"}
          border={"1px solid #494949"}
          fontColor={"#CBCBCB"}
        />
        <CustomButton
          handleClick={deleteSelectedPlayer}
          name={"Delete"}
          backgroundColor={"#D23131"}
          border={"1px solid #D23131"}
          fontColor={"#F8F8F8"}
        />
      </div>
    </div>
  );
};

export default ConfirmDialog;
