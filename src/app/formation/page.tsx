"use client";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./page.module.scss";
import { useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  getPositionPlayers,
  messageInfo1,
  messageInfo2,
  messageInfo3,
  messageName1,
  messageName2,
  messageName3,
} from "@/utils/utils";
import { setActivePlayer } from "@/redux/reducers/playersSlice";
import HeaderDetails from "@/components/header-details/header-details";
import InfoDialog from "@/components/info-dialog/info-dialog";
import Ground from "./components/ground/ground";
import EmptyInfo from "./components/player-info/empty-info";
import Box from "@/components/box/box";
import PlayerPosition from "@/components/player-position/player-position";
import PlayerInfo from "./components/player-info/player-info";
import { Player } from "@/interfaces/interfaces";

const FormationPage: React.FC = () => {
  const players: Player[] | undefined = useSelector(
    (state: RootState) => state.players.allPlayers
  );
  const dispatch = useDispatch();

  // 1.] get players with starter "Yes"
  const starters = players && players.filter((p) => p.starter === "Yes");

  // 2.] filter positions
  const { goalKeeper, defenders, midFielders, forward } =
    getPositionPlayers(starters);

  // 3.] set goal keeper as selected player initially
  useEffect(() => {
    if (goalKeeper) {
      dispatch(setActivePlayer(goalKeeper[0]));
    }
  }, []);

  // render messages, if there are no players, more starters, or fewer starters
  const renderMessage = (name: string, message: string) => {
    return (
      <div className={styles.container}>
        <HeaderDetails />
        <div className={styles.formation}>
          <InfoDialog name={name} message={message} />
          <Ground></Ground>
          <EmptyInfo />
        </div>
      </div>
    );
  };

  if (!players) {
    return renderMessage(messageName1, messageInfo1);
  } else if (starters.length < 11) {
    return renderMessage(messageName2, messageInfo2);
  } else if (starters.length > 11) {
    if (
      goalKeeper ||
      (defenders && defenders.length > 4) ||
      (midFielders && midFielders.length > 3) ||
      (forward && forward.length > 3)
    )
      return renderMessage(messageName3, messageInfo3);
  } else {
    // render player position in the field
    const renderPositions = (players: Player[] | undefined, cls: string) => {
      return (
        players &&
        players.map((player, ind) => {
          return (
            <PlayerPosition
              key={player.id}
              addClass={`${cls}${ind + 1}`}
              player={player}
            />
          );
        })
      );
    };
    return (
      <Box classe={styles.container}>
        <HeaderDetails />
        <div className={styles.formation}>
          <Ground>
            {goalKeeper && (
              <PlayerPosition addClass="goal" player={goalKeeper[0]} />
            )}
            {midFielders && renderPositions(midFielders, "mid")}
            {defenders && renderPositions(defenders, "def")}
            {forward && renderPositions(forward, "for")}
          </Ground>
          <PlayerInfo />
        </div>
      </Box>
    );
  }
};

export default FormationPage;
