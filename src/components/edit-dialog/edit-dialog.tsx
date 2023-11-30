import { useState } from "react";
import styles from "./edit-dialog.module.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  updateCurrentPlayer,
  updatePlayer,
} from "@/redux/reducers/playersSlice";
import { setDialogWindow } from "@/redux/reducers/dialogSlice";
import Close from "@/assets/close";
import FormInput from "./form-input";
import CustomButton from "../custom-button/custom-button";
import { nationalities, positions } from "@/utils/data";

const EditDialog = () => {
  const [edited, setEdited] = useState(false);
  const dispatch = useDispatch();
  const currentPlayer = useSelector(
    (state: RootState) => state.players.currentPlayer
  );

  if (!currentPlayer) {
    return;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    dispatch(updateCurrentPlayer({ name, value }));
    setEdited(true);
  };

  const updateEditedPlayer = () => {
    const { playername, jerseynumber, height, weight } = currentPlayer;
    if (!playername || !jerseynumber || !height || !weight) {
      alert("Values should't be empty..! :(");
      return;
    }
    dispatch(updatePlayer(currentPlayer));
    dispatch(setDialogWindow({ type: "cancel" }));
    alert("Player data updated");
  };

  return (
    <div className={styles.container}>
      {/* top */}
      <div className={styles.top}>
        <div className={styles.heading}>Edit Player</div>
        <div
          onClick={() => dispatch(setDialogWindow({ type: "cancel" }))}
          className={styles.closeDialog}
        >
          <Close type={2} />
        </div>
      </div>

      {/* name, jersey number update */}
      <div className={styles.form}>
        <div className={styles.formOne}>
          <FormInput
            inputName={"playername"}
            handleInputChange={handleInputChange}
            value={currentPlayer.playername}
            name="Player Name"
          />
          <FormInput
            inputName={"jerseynumber"}
            handleInputChange={handleInputChange}
            value={currentPlayer.jerseynumber}
            name="Jersey Number"
          />
        </div>

        {/* name, height, height update */}
        <div className={styles.formTwo}>
          <FormInput
            inputName={"height"}
            handleInputChange={handleInputChange}
            value={currentPlayer.height}
            name="Height"
          />
          <FormInput
            inputName={"weight"}
            handleInputChange={handleInputChange}
            value={currentPlayer.weight}
            name="Weight"
          />
        </div>

        {/* nationality, position update */}
        <div className={styles.formThree}>
          <FormInput
            inputName={"nationality"}
            type={2}
            value={currentPlayer.nationality}
            name="Nationality"
            data={nationalities}
            handleInputChange={handleInputChange}
          />
          <FormInput
            inputName={"position"}
            type={2}
            value={currentPlayer.position}
            name="Position"
            data={positions}
            handleInputChange={handleInputChange}
          />
        </div>

        {/* starter update */}
        <div className={styles.formFour}>
          <FormInput
            inputName={"starter"}
            type={3}
            value={currentPlayer.starter}
            name="Starter"
            handleInputChange={handleInputChange}
          />
        </div>
        {/* button */}
        {edited ? (
          <div className={styles.dialogBtn}>
            <CustomButton
              name={"Edit Player"}
              backgroundColor={"#FEA013"}
              border={"1px solid #FEA013"}
              fontColor={"#F8F8F8"}
              handleClick={updateEditedPlayer}
            />
          </div>
        ) : (
          <div className={styles.dialogBtn}>
            <CustomButton
              name={"Edit Player"}
              backgroundColor={"#2D2D2D"}
              border={"none"}
              fontColor={"#707070"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditDialog;
