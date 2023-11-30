import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./player-position.module.scss";
import { setActivePlayer } from "@/redux/reducers/playersSlice";
import { PlayerPositionProps } from "@/interfaces/interfaces";
import { RootState } from "@/redux/store";

const PlayerPosition: React.FC<PlayerPositionProps> = ({
  addClass,
  player,
}) => {
  const activePlayer = useSelector(
    (state: RootState) => state.players.activePlayer
  );
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setActivePlayer(player));
  };

  if (!player || !activePlayer) {
    return null;
  } else {
    const compare = activePlayer.playername === player.playername;
    return (
      <div
        onClick={handleClick}
        className={`${styles.container} ${styles[addClass]} `}
      >
        <div className={`${styles.position} ${compare && styles.activePlayer}`}>
          {player && player.jerseynumber}
        </div>
        <div className={styles.name}>{player && player.playername}</div>
      </div>
    );
  }
};

export default PlayerPosition;
