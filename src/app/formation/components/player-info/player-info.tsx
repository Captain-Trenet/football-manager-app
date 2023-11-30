import React from "react";
import { useSelector } from "react-redux";
import styles from "./player-info.module.scss";
import EmptyInfo from "./empty-info";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { convertCmtoM } from "@/utils/utils";

const PlayerInfo: React.FC = () => {
  const player = useSelector((state: RootState) => state.players.activePlayer);

  if (!player) {
    return <EmptyInfo />;
  }

  const {
    playerimage,
    playername,
    position,
    height,
    weight,
    nationality,
    appearances,
    minutesplayed,
    cleansheets,
    jerseynumber,
    saves,
    goals,
    assists,
  } = player;

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <div className={styles.jnumber}>
          <div className={styles.big}>
            {jerseynumber} <div className={styles.small}> {jerseynumber}</div>
          </div>
        </div>
        <div className={styles.img}>
          <div className={styles.gradient}>&nbsp;</div>
          {/* <img className={styles.playerimage} src={playerimage} alt="" /> */}
          <Image
            className={styles.playerimage}
            src={playerimage}
            alt="player image"
            fill
          />
        </div>
      </div>
      <div className={styles.top}>
        <div className={styles.details1}>
          <div className={styles.name}>{playername}</div>
          <div className={styles.position}>{position}</div>
        </div>
        <div className={styles.details2}>
          <div className={styles.details3}>
            <div className={styles.key}>Height</div>
            <div className={styles.value}>{convertCmtoM(height)} m</div>
          </div>
          <div className={styles.details3}>
            <div className={styles.key}>Weight</div>
            <div className={styles.value}>{weight} kg</div>
          </div>
          <div className={styles.details3}>
            <div className={styles.key}>Nationality</div>
            <div className={styles.value}>{nationality}</div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.bottom}>
          <div className={styles.info}>
            <div className={styles.value}>{appearances}</div>
            <div className={styles.name}>Appearances</div>
          </div>
          <div className={styles.info}>
            <div className={styles.value}>{minutesplayed}</div>
            <div className={styles.name}>Minutes Played</div>
          </div>

          {position === "Goalkeeper" ? (
            <>
              <div className={styles.info}>
                <div className={styles.value}>{cleansheets}</div>
                <div className={styles.name}>Clean sheets</div>
              </div>
              <div className={styles.info}>
                <div className={styles.value}>{saves}</div>
                <div className={styles.name}>Saves</div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.info}>
                <div className={styles.value}>{goals}</div>
                <div className={styles.name}>Goals</div>
              </div>
              <div className={styles.info}>
                <div className={styles.value}>{assists}</div>
                <div className={styles.name}>Assists</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;
