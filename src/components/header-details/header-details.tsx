import React, { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../custom-button/custom-button";
import Pen from "../../assets/pen";
import styles from "./header-details.module.scss";
import { updateTeamName } from "@/redux/reducers/playersSlice";
import { RootState } from "@/redux/store";

const HeaderDetails: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const teamName = useSelector((state: RootState) => state.players.teamName);
  const dispatch = useDispatch();

  const updateMode = () => {
    if (!teamName) {
      alert("Team name should not be empty");
      return;
    }
    setEditMode(false);
  };

  const handleTeamNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTeamName(e.target.value));
  };

  return (
    <div className={styles.details}>
      <div className={styles.heading}>Roster Details</div>
      <div className={styles.name}>
        {editMode ? (
          <div className={styles.editName}>
            <input
              onChange={handleTeamNameChange}
              type="text"
              value={teamName}
            />
            <CustomButton
              name={"Save"}
              backgroundColor={"#FEA013"}
              border={"none"}
              fontColor={"#F8F8F8"}
              handleClick={updateMode}
            />
          </div>
        ) : (
          <div className={styles.text}>{teamName}</div>
        )}

        {!editMode && (
          <div
            className={`${styles.editIcon} ${
              teamName !== "My Team" && styles.editIconHidden
            }`}
            onClick={() => setEditMode(true)}
          >
            <Pen />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderDetails;
