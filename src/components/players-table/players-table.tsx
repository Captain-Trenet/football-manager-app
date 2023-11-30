import { useSelector } from "react-redux";
import styles from "./players-table.module.scss";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setDialogWindow } from "@/redux/reducers/dialogSlice";
import { setCurrentPlayer } from "@/redux/reducers/playersSlice";
import ActionDialog from "../action-dialog/action-dialog";
import ConfirmDialog from "../confirm-dialog/confirm-dialog";
import EditDialog from "../edit-dialog/edit-dialog";
import { convertCmtoM } from "@/utils/utils";
import Dots from "@/assets/dots";
import { Player, PlayersTableProps } from "@/interfaces/interfaces";
import Image from "next/image";

const PlayersTable: React.FC<PlayersTableProps> = ({ toggleImport }) => {
  let players = useSelector((state: RootState) => state.players.allPlayers);
  const dialog = useSelector((state: RootState) => state.dialog);
  const filteredPlayers = useSelector(
    (state: RootState) => state.players.filteredPlayers
  );

  if (filteredPlayers?.length > 0) {
    players = filteredPlayers;
  }

  const dispatch = useDispatch();

  const setSelectedPlayer = (player: Player) => {
    dispatch(setDialogWindow({ type: "action", payload: true }));
    dispatch(setCurrentPlayer(player));
  };

  return (
    <div className={styles.container}>
      {dialog.action && <ActionDialog />}
      {dialog.confirm && <ConfirmDialog />}
      {dialog.edit && <EditDialog />}
      <table>
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Jersey Number</th>
            <th>Position</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Nationality</th>
            <th>Appearances</th>
            <th>Minutes Played</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {players?.length <= 0 ? (
            <tr className={styles.importInfo}>
              <td className={styles.importInfoMsg}>
                You do not have any players on the roster
              </td>
              <td onClick={toggleImport} className={styles.importInfoBtn}>
                Import Team
              </td>
            </tr>
          ) : (
            players.map((player) => (
              <tr key={player.jerseynumber}>
                <td className={styles.country}>
                  <Image
                    width={24}
                    height={24}
                    src={player.flagimage}
                    alt="Country Flag"
                  />
                  {/* <img src={player.flagimage} alt="Country Flag" /> */}
                  {player.playername}
                </td>
                <td>{player.jerseynumber}</td>
                <td>{player.position}</td>
                {/* <td>{player.height}</td> */}
                <td>{convertCmtoM(player.height)} m</td>
                <td>
                  {player.weight} {player.weight !== "Unknown" && "kg"}
                </td>
                <td>{player.nationality}</td>
                <td>{player.appearances}</td>
                <td>{player.minutesplayed}</td>
                <td
                  className={styles.edit}
                  onClick={() => setSelectedPlayer(player)}
                >
                  <Dots />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PlayersTable;
